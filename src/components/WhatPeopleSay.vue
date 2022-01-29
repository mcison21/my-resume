<template>
    <!-- eslint-disable -->
    <h2 class="what-people-say-title">What People Say</h2>
    <section class="what-people-say">
        <div
            v-for="peep in peeps"
            :key="peep.name"
            class="comment">
            <div v-if="peep.name" class="name-title">
                <span class="name">{{ peep.name }}</span><br />
                <span class="title">{{ peep.title }}</span>
            </div>
            <div v-else class="title-only">
                <span class="title">{{ peep.title }}</span>
            </div>
            <blockquote>
                <span>{{ peep.say }}</span>
            </blockquote>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'WhatPeopleSay',
  props: {
    peeps: Object,
  },
  setup() {
    // eslint-disable-next-line
    const isInViewPort = (elem: HTMLElement): boolean => (window.scrollY + window.outerHeight - 200) > elem.offsetTop;
    const checkIfInViewPort = () => {
      const whatPeopleSay = document.querySelector('.what-people-say');
      if (whatPeopleSay && isInViewPort((whatPeopleSay as HTMLElement))) {
        whatPeopleSay.classList.add('in-viewport');
      } else {
        document.addEventListener('scroll', () => checkIfInViewPort(), { once: true });
      }
    };
    onMounted(() => {
      checkIfInViewPort();
    });

    return {

    };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:math';

.what-people-say {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 0;
  padding: 0 2rem 2rem;
  overflow: hidden;
}

.comment {
  padding: 2rem 0;
  background: var(--tertiary);
  border-radius: var(--border-radius);
  color: var(--txt-light);
  box-shadow: 5px 5px 0px var(--secondary);
  grid-area: say;
  position: relative;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "say"
    "info";
  align-items: center;
  min-width: 100%;
  margin: 0 auto;
  opacity: 0;

  transition: transform .4s ease-in, opacity .8s;

  @media (min-width: 760px) {
    width: 50%;
    min-width: unset;
  }
}

@for $i from 1 through 20 {
  @if $i % 2 == 0 {
    .comment:nth-child(#{$i}) {
      transform: translate(200px);
      transition-delay: math.div(($i * 3), 10) + 's';
    }
  } @else {
    .comment:nth-child(#{$i}) {
      transform: translate(-200px);
      transition-delay: math.div(($i * 3), 10) + 's';
    }
  }
}

@for $i from 1 through 20 {
  @if $i % 2 == 0 {
    .in-viewport .comment:nth-child(#{$i}) {
      transform: translate(10px);
      opacity: 1;
    }
  } @else {
    .in-viewport .comment:nth-child(#{$i}) {
      transform: translate(-10px);
      opacity: 1;
    }
  }
}

.comment blockquote {
  padding: 2rem;
  font-size: 1.3rem;
  background: var(--tertiary);
  color: var(--txt-light);
  grid-area: say;
  margin: 0;

  text-align: center;
}

.comment:nth-child(odd) {
  grid-template-areas: "say" "info";
}

.comment .title-only, .comment .name-title {
  grid-area: info;
  padding: 1rem;
  text-align: center;
}

.name-title .title {
  font-style: italic;
}
</style>
