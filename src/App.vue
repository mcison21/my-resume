<template>
  <div
    :class="[ theme, (prefersDark ? 'prefers-dark' : '') ]"
    class="wrapper">
    <header>
      <Themer @theme-change="theme = $event" @prefers-dark="prefersDark = $event" />
      <h1>{{ reactivePerson.name }}</h1>
      <nav>
        <ul>
          <li><a href="#work-experience" class="btn">Work Experience</a></li>
          <li><a href="#education" class="btn">Education</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <Spotlight />
      <h2 id="work-experience">Work Experience</h2>
      <section v-if="!reactivePerson.workExperiences">Notta</section>
      <WorkExperience
        v-else
        v-for="workExperience in reactivePerson.workExperiences"
        :key="workExperience.company"
        :workExperience="workExperience" />
      <h2 id="education">Education</h2>
      <section v-if="!reactivePerson.educations">Notta</section>
      <Education
        v-else
        v-for="education in reactivePerson.educations"
        :key="education.name"
        :education="education" />
      <h2
        v-if="reactivePerson.selectedProjects"
        class="selected-projects-title">Selected Projects</h2>
      <div
        v-if="reactivePerson.selectedProjects"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
        class="selected-projects">
        <SelectedProject
          v-for="project in reactivePerson.selectedProjects"
          :key="project.name"
          :project="project" />
      </div>
      <WhatPeopleSay
        v-if="reactivePerson.whatPeopleSay"
        :peeps="reactivePerson.whatPeopleSay" />
    </main>
    <footer>Made with <HeartIcon /> by Corey Ison</footer>
  </div>
</template>

<script lang="ts">
import {
  ref, onMounted, onUnmounted, Ref,
} from 'vue';
import Spotlight from './components/Spotlight.vue';
import WorkExperience from './components/WorkExperience.vue';
import Education from './components/Education.vue';
import WhatPeopleSay from './components/WhatPeopleSay.vue';
import SelectedProject from './components/SelectedProject.vue';
import HeartIcon from './components/icons/HeartIcon.vue';
import Themer from './components/Themer.vue';
import person from './data/person';

export default {
  name: 'App',
  components: {
    Spotlight,
    WorkExperience,
    Education,
    WhatPeopleSay,
    SelectedProject,
    HeartIcon,
    Themer,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const reactivePerson = ref(person);

    const theme: Ref<string> = ref('theme-1');
    const themes = ref([
      'theme-1',
      'theme-2',
      'theme-3',
    ]);
    const prefersDark = ref(true);

    // eslint-disable-next-line
    const isInViewPort = (elem: HTMLElement): boolean => (window.scrollY + window.outerHeight) > elem.offsetTop;

    let autoScrollInterval: number;
    let scrollPosition = 0;
    let selectedProjectIndex = 0;
    let selectedImageIndex = 1;
    const scrollSelectedProjects = () => {
      const selectedProjects = document.querySelector('.selected-projects');
      if (!selectedProjects) return;
      if (!isInViewPort((selectedProjects as HTMLElement))) return;

      const selectedProject = selectedProjects.querySelector(`.selected-project:nth-child(${selectedProjectIndex + 1})`);
      if (selectedProject) {
        const selectedProjectImageCnt = selectedProject.querySelectorAll('.selected-project-image').length;
        const selectedProjectImage = selectedProject.querySelector(`.selected-project-image:nth-child(${selectedImageIndex + 1})`);
        if (!selectedProjectImage) return;

        selectedImageIndex += 1;
        scrollPosition += selectedProjectImage.getBoundingClientRect().left;
        if (selectedImageIndex === selectedProjectImageCnt) {
          selectedProjectIndex += 1;
          selectedImageIndex = 0;
        }
        selectedProjects.scrollTo(scrollPosition, 0);
      } else {
        scrollPosition = 0;
        selectedProjectIndex = 0;
        selectedImageIndex = 1;
        selectedProjects.scrollTo(scrollPosition, 0);
      }
    };

    let stuckTimeout: number;
    let prevWindowScrollY = 0;
    const handleStuck = () => {
      const header = document.querySelector('header');
      const scrollDirection = window.scrollY > prevWindowScrollY ? 'down' : 'up';
      if (header) {
        let { height: headerHeight } = header.getBoundingClientRect();
        headerHeight = Math.round(headerHeight * 10000) / 10000;

        prevWindowScrollY = window.scrollY;

        if (scrollDirection === 'down' && window.scrollY > headerHeight && !header.classList.contains('stuck')) {
          clearTimeout(stuckTimeout);
          stuckTimeout = setTimeout(() => {
            // header.style.top = '0px';
            header.classList.add('show');
          }, 1000);

          header.classList.add('stuck');
        } else if ((window.scrollY <= headerHeight && header.classList.contains('stuck'))) {
          clearTimeout(stuckTimeout);
          // header.style.top = `-${headerHeight}px`;

          header.classList.remove('stuck');
          header.classList.remove('show');
        } else if ((scrollDirection === 'up' && header.classList.contains('show'))) {
          clearTimeout(stuckTimeout);
          // header.style.top = `-${headerHeight}px`;
          header.classList.remove('show');
        } else if ((scrollDirection === 'down' && !header.classList.contains('show'))) {
          clearTimeout(stuckTimeout);
          stuckTimeout = setTimeout(() => {
            // header.style.top = '0px';
            header.classList.add('show');
          }, 1000);
        }
      }

      document.addEventListener('scroll', () => handleStuck(), { once: true });
    };

    onMounted(() => {
      handleStuck();
      autoScrollInterval = setInterval(() => scrollSelectedProjects(), 5000);

      const themeCookieValue = document.cookie.split('; ').find((cookie) => cookie.startsWith('theme='))?.split('=')[1];
      theme.value = themeCookieValue || 'theme-1';

      // eslint-disable-next-line
      const cookieValue = document.cookie.split('; ').find((cookie) => cookie.startsWith('prefersDarkMode='))?.split('=')[1];
      prefersDark.value = cookieValue === 'true';
    });

    onUnmounted(() => clearInterval(autoScrollInterval));

    const pauseAutoScroll = () => clearInterval(autoScrollInterval);
    const resumeAutoScroll = () => {
      const selectedProjects = document.querySelector('.selected-projects');
      if (!selectedProjects) return;

      if (selectedProjects.scrollLeft !== scrollPosition) {
        setTimeout(() => {
          if (selectedProjects) {
            selectedProjects.scrollTo(scrollPosition, 0);
          }
          autoScrollInterval = setInterval(() => scrollSelectedProjects(), 5000);
        }, 5000);
      } else {
        autoScrollInterval = setInterval(() => scrollSelectedProjects(), 5000);
      }
    };

    return {
      reactivePerson,
      pauseAutoScroll,
      theme,
      themes,
      prefersDark,
      resumeAutoScroll,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

:root {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;

  --charcoal: #264653;
  --persian-green: #2a9d8f;
  --dark-salmon: #f78e69;
  --light-yellow: #f8ffe5;

  --imperial-red: #e63946ff;
  --honeydew: #f1faeeff;
  --powder-blue: #a8dadcff;
  --celadon-blue: #457b9dff;
  --prussian-blue: #1d3557ff;

  scroll-behavior: smooth;
}

.theme-dark {

}

.theme-1 {
  --primary: var(--honeydew);
  --secondary: var(--celadon-blue);
  --tertiary: var(--prussian-blue);

  --txt-dark: var(--prussian-blue);
  --txt-light: var(--honeydew);

  --txt-muted: rgb(0 0 0 / 25%);

  --border-radius: 4px;
}

.theme-2 {
  --primary: #e5e5e5;
  --secondary: #fca311;
  --tertiary: #14213d;

  --txt-dark: #14213d;
  --txt-light: #e5e5e5;

  --txt-muted: rgb(0 0 0 / 30%);

  --border-radius: 24px;
}

.theme-2 .card {
  grid-template-areas:
    "title"
    "meta"
    "blurb"
    "skills";
}

.theme-2 .education.card {
  grid-template-areas:
    "title"
    "meta"
    "skills";
}

.theme-3 {
  --primary: #9b2226;
  --secondary: #bb3e03;
  --tertiary: #ae2012;

  --txt-dark: #001219;
  --txt-light: #e9d8a6;
  --txt-muted: #aaa;

  --txt-muted: rgb(0 0 0 / 30%);

  --border-radius: 0px;
}

.theme-3 .education .card {
  grid-template-areas:
    "title"
    "blurb"
    "skills"
    "meta";
}

.theme-3 .skills h4 {
  display: none;
}

.theme-3 .spotlight .title {
  color: var(--txt-dark);
}

.theme-3 .spotlight .title .type,
.theme-3 .skills li,
.theme-3 .card .meta > span {
  color: var(--txt-light);
}

*, *::before, *::after {
  box-sizing: border-box;
}

*:not(header), *::before, *::after {
  transition: border-radius 1s, background-color 1s;
}

body {
  padding: 0;
  margin: 0;
  background: var(--primary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

h1 {
  color: var(--txt-dark);
}

h2 {
  color: var(--secondary);
}

h3 {
  color: var(--tertiary);
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 760px) {
  .wrapper {
    grid-template-columns: repeat(16, 1fr);
  }

  header,
  footer,
  main > * {
    grid-column: 4 / span 10;
  }

  .selected-projects, .what-people-say {
    grid-column: 1 / -1;
  }

  .stuck {
    position: fixed;
    top: 0px;
    right: 0;
    left: 0;
    margin: 0;
    padding: 1rem 2rem;
    background: var(--tertiary);
    box-shadow: 0px 0px 6px 2px rgb(0 0 0 / 45%);
    flex-flow: row nowrap;

    transition: top 0.2s;
  }

  .stuck h1 {
    color: var(--txt-light);
    font-size: 1.2rem;
  }

  header.stuck, header.stuck.show {
    top: -100%;
  }

  .stuck h1 {
    grid-column: 4 / span 3;
  }

  .stuck nav {
    grid-column: 8 / span 6;
    justify-self: right;
    text-align: right;
  }

  header.stuck {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
  }

  header.stuck.show {
    top: 0;
  }

  .stuck nav li {
    margin: 0;
  }

  .stuck nav .btn {
    background: var(--tertiary);
    color: var(--txt-light);
  }

  .stuck nav .btn:hover {
    background: var(--secondary);
  }
}

header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;

  margin: 2rem 2rem 0;
  z-index: 1000;
}

@media (min-width: 760px) {
  header {
    flex-direction: row;
    margin: 0 2rem;
  }
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-flow: row nowrap;
  gap: 0.5rem;
}

nav li {
  margin: 2rem 0;
}

main {
  display: grid;
  grid-template-columns: 1fr;
  grid-column: 1 / -1;
}

@media (min-width: 760px) {
  main {
    grid-template-columns: repeat(16, 1fr);
  }
}

main section, main h2 {
  margin: 2rem;
}

.selected-projects {
  scroll-behavior: smooth;
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 8rem;
  background: var(--tertiary);
}

footer {
  color: var(--txt-muted);
  margin: 2rem 0;
  text-align: center;
}

/**
*
* Utility Classes
*
*/

.card {
  display: grid;
  gap: 2rem;
  background: var(--secondary);
  border-radius: var(--border-radius);
  box-shadow: 0px 6px 8px 1px rgb(0 0 0 / 35%);
  color: var(--txt-light);
  padding: 2rem 1.5rem;
}

.card > h3 {
  color: var(--txt-light);
}

.card .meta {
  margin: 0;
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}

.card .meta > span {
  background: var(--primary);
  border-radius: var(--border-radius);
  box-shadow: 5px 5px 0px var(--tertiary);
  color: var(--txt-dark);
  padding: 0.75rem 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  color: var(--tertiary);
  text-decoration: none;
  border-radius: var(--border-radius);

  transition: background 200ms, color 200ms;
}

.btn:hover {
  background: var(--tertiary);
  color: white;
}

.btn.inline {
  padding: 0.25rem;
}

@media print {
  header {
    align-items: flex-start;
  }

  .gear, nav,
  .what-people-say, .what-people-say-title {
    display: none!important;
  }

  .stuck {
    position: static!important;
    background: none;
    box-shadow: none;
  }

  .stuck h1 {
    color: var(--txt-dark);
  }

  .card {
    background: none;
    color: var(--txt-dark);
    box-shadow: none;
    padding: 0;
    grid-template-areas:
        "title"
        "meta"
        "blurb"
        "skills"!important;
    gap: 2rem;
    border-bottom: 1px solid;
    border-radius: 0;
    margin-bottom: 1rem;
    padding-bottom: 2rem!important;
  }

  .card > h3,
  .theme-3 .education .skills li {
      color: var(--txt-dark);
  }

  .card > .skills h4, .card > .skills ul, .card > .skills {
      page-break-inside: avoid;
      page-break-before: avoid;
      page-break-after: avoid;
      break-after: avoid-page;
      break-before: avoid-page;
      break-inside: avoid-page;
      -webkit-column-break-after: avoid;
      -webkit-column-break-before: avoid;
      -webkit-column-break-inside: avoid;
  }

  .selected-projects, .selected-projects-title {
      display: none;
  }

  .theme-3 .skills h4 {
    display: block;
  }
}

/* @media (prefers-color-scheme: dark) { */
  .prefers-dark {
    background: #000;
    color: #fff;
  }

  .prefers-dark h1 {
    color: #fff;
  }

  .prefers-dark nav .btn {
    color: #fff;
  }

  .prefers-dark .statement .type {
    color: #555!important;
  }

  .prefers-dark .card {
    background: none;
    padding: 0;
    gap: 2rem;
  }

  .prefers-dark .gear {
    color: #eee!important;
  }
/* } */
</style>
