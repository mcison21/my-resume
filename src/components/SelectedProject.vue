<template>
  <!-- eslint-disable max-len -->
  <div class="selected-project">
    <div class="selected-project-title">
      <h3>{{ project.name }}</h3>
    </div>
    <div class="selected-project-images">
      <div
        v-for="image in project.images"
        :key="image.item"
        class="selected-project-image">
        <div
          :style="`background-image: url(${project.baseUrl}/${project.dir}/${project.dir}-${image.item}.png);`"
          :data-image-url="`${project.baseUrl}/${project.dir}/${project.dir}-${image.item}.png`"
          class="image-container"
        ></div>
        <div class="mousemove-target">
          <div
            @mousemove="trackMouse"
            @mouseout="centerBackground"
            class="overlay"></div>
        </div>
        <p class="caption">{{ image.caption }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectedProject',
  props: {
    project: Object,
  },
  setup() {
    interface ImageDims {
      width: number,
      height: number,
    }

    // eslint-disable-next-line
    const getImageDims = async (url: string | undefined): Promise<ImageDims | undefined> => {
      return new Promise((resolve, reject) => {
        if (url === undefined) reject(new Error('URL is undefined'));
        const img = new Image();
        // eslint-disable-next-line
        img.addEventListener('load', function (this: HTMLImageElement) {
          resolve({
            width: this.naturalWidth,
            height: this.naturalHeight,
          });
        });
        // eslint-disable-next-line
        img.src = url!;
      });
    };

    const getPosAsPercent = (
      mouse: { x: number, y: number },
      box: { width: number, height: number, left: number, top: number },
      imageDims: ImageDims,
    ): { xPercent: number, yPercent: number } => {
      const widthScale = imageDims.width / box.width;
      const heightScale = imageDims.height / box.height;
      const xPercent = Math.round((((mouse.x - box.left) * widthScale) / imageDims.width) * 100);
      const yPercent = Math.round((((mouse.y - box.top) * heightScale) / imageDims.height) * 100);

      return {
        xPercent,
        yPercent,
      };
    };

    let imageDims: ImageDims | undefined;
    const trackMouse = (e: MouseEvent) => {
      const trackBox = (e.target as HTMLDivElement);
      const image = (trackBox.closest('.selected-project-image')?.querySelector('.image-container') as HTMLDivElement);
      image.style.backgroundSize = 'unset';
      if (imageDims === undefined) {
        getImageDims(image.dataset.imageUrl)
          .then((dim) => {
            imageDims = dim;
            if (imageDims) {
              const { xPercent, yPercent } = getPosAsPercent(
                { x: e.x, y: e.y },
                trackBox.getBoundingClientRect(),
                imageDims,
              );

              image.style.backgroundPositionX = `${xPercent}%`;
              image.style.backgroundPositionY = `${yPercent}%`;
            }
          })
          .catch((error) => console.warn(error));
      } else {
        const { xPercent, yPercent } = getPosAsPercent(
          { x: e.x, y: e.y },
          trackBox.getBoundingClientRect(),
          imageDims,
        );

        image.style.backgroundPositionX = `${xPercent}%`;
        image.style.backgroundPositionY = `${yPercent}%`;
      }
    };

    const centerBackground = (e: MouseEvent) => {
      const div = (e.target as HTMLDivElement);
      const image = (div.closest('.selected-project-image')?.querySelector('.image-container') as HTMLDivElement);
      image.style.backgroundSize = 'cover';
      image.style.backgroundPosition = 'center';
      imageDims = undefined;
    };

    return {
      trackMouse,
      centerBackground,
    };
  },
});
</script>

<style scoped>
img {
  max-width: 100%;
}

.selected-project {
  position: relative;
  background: var(--tertiary);
}

.selected-project-title {
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1;
  transform: rotate(-76deg) skew(15deg, 0);
  left: -17.5rem;
  width: 33.1rem;
  height: 6rem;
  top: 13.5rem;
}

.selected-project-title h3 {
  color: var(--txt-light);
  white-space: nowrap;
  font-size: clamp(3rem, 4rem, 7vh);
  font-variant: all-small-caps;
  font-weight: 900;
  text-shadow: 0px 3px 6px rgb(0 0 0 / 30%);
}

.selected-project-images {
  background: var(--tertiary);
  display: flex;
  flex-flow: row nowrap;
  margin-left: 3rem;
}

.selected-project-image {
  width: 32rem;
  height: 32rem;
  clip-path: polygon(25% 0%, 0 100%, 75% 100%, 100% 0);
  margin: 0.5rem 0 0.5rem -7.5rem;
  transition: clip-path 0.2s, transform 0.2s, border 0.2s;
  transition-delay: 0, 0, 0.2s;

  position: relative;
}

.selected-project-image .image-container {
  background-color: var(--tertiary);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--tertiary);
  position: absolute;
  inset: 0;
  transition: transform 0.5s, background-position 200ms;
}

.selected-project-image:hover {
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0);
  border-left: 0.5rem solid var(--tertiary);
  border-right: 0.5rem solid var(--tertiary);
  z-index: 100;
  position: relative;
}

.caption {
  font-weight: bold;
  font-size: 1.1rem;
  background: rgb(255 255 255 / 50%);
  color: var(--txt-dark);
  transition: bottom 0.2s;
  transition-delay: 0.2s;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -100%;
  padding: 2rem;
  margin: 0;
  box-shadow: -1px 0px 4px 4px rgb(0 0 0 / 15%);
  backdrop-filter: blur(2px);
}

.selected-project-image:hover .caption {
  bottom: 0;
}

.mousemove-target {
  position: absolute;
  left: 50%;
  top: 5%;
  width: 28rem;
  height: 24rem;
  display: none;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 0);
  background: rgb(0 0 0 / 15%);
  border-radius: var(--border-radius);
}

.selected-project-image:hover .mousemove-target {
  display: flex;
}

.mousemove-target .overlay {
  position: absolute;
  inset: 0;
  /* background: rgb(255 255 255 / 25%);
  box-shadow: 0px 0px 4px rgba(0 0 0 / 15%);
  border-radius: var(--border-radius); */
}
</style>
