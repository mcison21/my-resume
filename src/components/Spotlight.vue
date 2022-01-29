<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="spotlight">
    <div class="title">
      <transition name="crossfade" mode="out-in" appear>
        <span v-if="type" class="type">{{ type }}</span>
        <span v-else class="type">{{ nextType }}</span>
      </transition>
      <span>developer</span>
    </div>
  </div>
  <div class="statement">
    <p>
      I am a passionate husband, father, and
      <transition name="crossfade" mode="out-in" appear>
        <span v-if="type" class="type">{{ type.toLowerCase() }}</span>
        <span v-else class="type">{{ nextType.toLowerCase() }}</span>
      </transition>
      developer. I love crafting new and unique software experiences that foster
      excitement and joy. I enjoy solving problems no one knew they had.
    </p>
  </div>
</template>

<script>
import {
  ref, onMounted, onUnmounted, defineComponent,
} from 'vue';

export default defineComponent({
  name: 'Spotlight',
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const type = ref('Full-stack');
    const nextType = ref(null);
    const types = [
      'Software',
      'Front-end',
      'Backend',
      'Full-stack',
      'Free-lance',
      'Web',
      'Application',
    ];

    const randomType = (not = null) => {
      const filteredTypes = types.filter((t) => !t.match(not));
      return filteredTypes[Math.floor(Math.random() * filteredTypes.length)];
    };

    let typeInterval;

    onMounted(() => {
      typeInterval = setInterval(() => {
        if (type.value) {
          nextType.value = randomType(type.value);
          type.value = null;
        } else {
          type.value = randomType(nextType.value);
          nextType.value = null;
        }
      }, 5000);
    });

    onUnmounted(() => clearInterval(typeInterval));

    return {
      type,
      nextType,
    };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';

.spotlight {
  position: relative;

  &::before {
    content: '';
    background: var(--secondary);
    clip-path: polygon(0 23%, 100% 0, 100% 77%, 0 100%);
    margin-top: 2rem;
    position: absolute;
    width: 100%;
    height: 260px;
    z-index: -1;
    top: -50px;
  }

  @media (min-width: 760px) {
    &::before {
      height: 210px !important;
    }
  }

  @media (min-width: 760px) {
    & {
      grid-column: 1 / -1;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-style: italic;

    padding: 4rem 0 16rem;

    background: var(--tertiary);
    color: var(--txt-light);
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
    padding: 4rem 2rem;

    @media (min-width: 760px) {
      & {
        flex-direction: row;
      }
    }
  }

  .title {
    .type {
      color: var(--secondary);
      text-align: center;

      @media (min-width: 760px) {
        & {
          text-align: right;
        }
      }
    }
  }
}

.statement {
  margin: 4rem 2rem 2rem;

  @media (min-width: 760px) {
    & {
      grid-column: 4 / span 10;
    }
  }
}

.type {
  display: inline-block;
  font-weight: 900;
  font-style: normal;
  color: var(--txt-dark);
  white-space: nowrap;
}

.crossfade-enter-active {
  opacity: 1;
  transform: translateY(0px);
  transition: opacity 200ms, transform 200ms;
}

.crossfade-leave-active {
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 200ms, transform 200ms;
}
</style>
