<template>
  <section class="card education">
    <h3>{{ education.name }}</h3>
    <div class="meta">
      <span v-for="major in education.majors" class="item" :key="major">
        <GradCapIcon />
        <span>{{ major }}</span>
      </span>
      <span class="item">
        <ClockIcon />
        <span>{{ education.gradDt }}</span>
      </span>
      <span class="item">
        <LocationMarkerIcon />
        <span>{{ education.location }}</span>
      </span>
    </div>
    <div v-if="education.awards.length" class="skills">
      <h4 class="skills-title">Honors & Awards</h4>
      <ul class="skills">
        <li v-for="award in education.awards" :key="award">{{ award }}</li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClockIcon from './icons/ClockIcon.vue';
import LocationMarkerIcon from './icons/LocationMarkerIcon.vue';
import GradCapIcon from './icons/GradCapIcon.vue';

export default defineComponent({
  name: 'Education',
  components: {
    ClockIcon,
    LocationMarkerIcon,
    GradCapIcon,
  },
  props: {
    education: Object,
  },
});
</script>

<style scoped>
h3 {
  margin-bottom: 1rem;
}

.card h3 {
  margin: 0;
}

.meta {
  color: var(--txt-muted);
  font-size: 0.9rem;

  align-items: center;
  margin-bottom: 1rem;
}

.meta .item {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem;
  align-items: center;
}

.card {
  grid-template-areas:
    "title"
    "skills"
    "meta";
}

.card > h3 {
  grid-area: title;
}

.card > .meta {
  grid-area: meta;
}

.card > .blurb {
  grid-area: blurb;
}

.card > h4 {
  grid-area: skills-title;
}

.card > .skills {
  grid-area: skills;
}
</style>
