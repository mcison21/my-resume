<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <!-- eslint-disable max-len -->
  <section class="card">
    <h3>{{ workExperience.name }}</h3>
    <div class="meta">
      <span class="item">
        <UserIcon />
        <span>{{ workExperience.title }}</span>
      </span>
      <span class="item">
        <ClockIcon />
        <span>{{ age }}</span>
      </span>
    </div>
    <div class="blurb">
      <p
        v-for="blurb in workExperience.blurbs"
        :key="blurb"
        v-html="blurb"></p>
    </div>
    <div v-if="workExperience.skills.length" class="skills">
      <h4>Skills & Technologies</h4>
      <ul>
        <li v-for="skill in workExperience.skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { formatDistanceStrict } from 'date-fns';
import UserIcon from './icons/UserIcon.vue';
import ClockIcon from './icons/ClockIcon.vue';

export default defineComponent({
  name: 'workExperience',
  components: {
    UserIcon,
    ClockIcon,
  },
  props: [
    'workExperience',
  ],
  setup(props) {
    const age = computed(():string => {
      const formattedDt = formatDistanceStrict(
        new Date(props.workExperience.fromDt),
        props.workExperience.toDt
          ? new Date(props.workExperience.toDt)
          : new Date(),
      );
      return formattedDt;
    });

    return {
      age,
    };
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

.card .meta {
  margin: 0;
}

.card .blurb p:first-child {
  margin-top: 0;
}

.meta .item {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem;
  align-items: center;
}

.skills ul {
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
}

.skills li {
  border-radius: var(--border-radius);
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: var(--txt-dark);
}

.card {
  grid-template-areas:
    "title"
    "blurb"
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

.card > .blurb p:last-of-type {
  margin-bottom: 0;
}

.card > .skills {
  grid-area: skills;
}
</style>
