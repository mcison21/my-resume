<template>
  <!-- eslint-disable -->
  <GearIcon
    @click="handleGearClick"
    @mouseleave="handleMouseLeave"
    class="gear" />
  <transition name="drop-fade" appear>
    <div
      v-if="hovering"
      @mouseenter="handleGearClick"
      @mouseleave="handleMouseLeave"
      :class="{ hide: !hovering }"
      class="themer">
        <div
            v-for="thisTheme in themes"
            :key="thisTheme"
            @click="handleThemeChange(thisTheme)"
            :class="[ thisTheme, 'pallete' ]">
            <div class="primary"></div>
            <div class="secondary"></div>
            <div class="tertiary"></div>
        </div>
        <h3 class="dark-mode-toggle">Dark mode</h3>
        <div
          @click="handleDarkModeToggle"
          class="dark-mode-toggle">
          <div
            :class="{ on: prefersDarkMode }" 
            class="txt">
            <span>On</span>
            <span>Off</span>
          </div>
          <div
            :class="{ on: prefersDarkMode }"
            class="btn-housing"></div>
        </div>
    </div>
  </transition>
</template>

<script type="ts">
import { onMounted, ref } from 'vue';
import GearIcon from './icons/GearIcon.vue';

export default {
  name: 'Themer',
  components: {
    GearIcon,
  },
  emits: ['theme-change', 'prefers-dark'],
  // eslint-disable-next-line
  setup(props, context) {
    const hovering = ref(false);
    const themes = ref([
      'theme-1',
      'theme-2',
      'theme-3',
    ]);

    const themeBackground = {
      'theme-1': '#1d3557',
      'theme-2': '#14213d',
      'theme-3': '#ae2012',
    };

    const handleThemeChange = (theme) => {
      context.emit('theme-change', theme);
      document.cookie = `theme=${theme}`;
      document.querySelector('meta[name=theme-color]').content = themeBackground[theme];
    };

    const prefersDarkMode = ref(false);
    onMounted(() => {
      const themeCookieValue = document.cookie.split('; ').find((cookie) => cookie.startsWith('theme='))?.split('=')[1];
      document.querySelector('meta[name=theme-color]').content = themeBackground[themeCookieValue] || themeBackground['theme-1'];

      const dmCookieValue = document.cookie.split('; ').find((cookie) => cookie.startsWith('prefersDarkMode='))?.split('=')[1];
      prefersDarkMode.value = dmCookieValue === 'true';
    });
    const handleDarkModeToggle = () => {
      prefersDarkMode.value = !prefersDarkMode.value;
      document.cookie = `prefersDarkMode=${prefersDarkMode.value}; `;
      context.emit('prefers-dark', prefersDarkMode.value);
    };

    let leaveTimeout;
    const handleGearClick = () => {
      clearTimeout(leaveTimeout);
      if (!hovering.value) {
        leaveTimeout = setTimeout(() => {
          hovering.value = true;
        }, 100);
      }
    };

    const handleMouseLeave = () => {
      clearTimeout(leaveTimeout);
      if (hovering.value) {
        leaveTimeout = setTimeout(() => {
          hovering.value = false;
        }, 100);
      }
    };

    return {
      hovering,
      themes,
      prefersDarkMode,
      handleDarkModeToggle,
      handleThemeChange,
      handleGearClick,
      handleMouseLeave,
    };
  },
};

</script>

<style scoped>
.themer {
  display: grid;
  grid-template-areas:
    "p1 p2 p3"
    "dmt dmt dmt"
    "dm dm dm";
  gap: 0.25rem;

  position: fixed;
  top: 2.75rem;
  right: 1rem;
  background: #000;
  padding: 0.25rem;
  border-radius: 5px;
}

.themer::before {
  content: '';
  border: 10px solid black;
  border-left: 10px solid transparent;
  border-right: 1px solid transparent;
  border-top: 5px solid transparent;
  position: absolute;
  top: -15px;
  right: 0.5rem;
}

.themer::after {
  content: '';
  background: transparent;
  height: 36px;
  position: absolute;
  left: 0;
  right: 0;
  top: -2rem;
}

.gear {
  grid-area: gear;
  color: var(--txt-dark)!important;
  text-align: right;
  position: fixed;
  top: 1rem;
  right: 1rem;

  z-index: 1000;
  transition: transform 0.2s;
  cursor: pointer;
}

.gear:hover {
  transform: rotate(25deg);
}

.stuck.show .gear {
  color: var(--txt-light)!important;
}

@media (prefers-color-scheme: dark) {
  .gear, .stuck.show .gear {
    color: #999!important;
  }
}

.themer > div:nth-of-type(1) {
  grid-area: p1;
}

.themer > div:nth-of-type(2) {
  grid-area: p2;
}

.themer > div:nth-of-type(3) {
  grid-area: p3;
}

.pallete {
  grid-area: pallete;

  display: flex;
  flex-direction: column;

  cursor: pointer;
}

.pallete > div {
  width: 15px;
  height: 15px;
}

.pallete > div:nth-child(1) {
  background: var(--primary);
}

.pallete > div:nth-child(2) {
  background: var(--secondary);
}

.pallete > div:nth-child(3) {
  background: var(--tertiary);
}

h3.dark-mode-toggle {
  grid-area: dmt;
  font-size: 0.7rem;
  color: #fff;
  text-align: center;
  margin-top: 0.25rem;
  margin-bottom: -0.25rem;
}

.dark-mode-toggle {
  position: relative;
  grid-area: dm;
  height: 20px;
  cursor: pointer;
  overflow: hidden;
}

.dark-mode-toggle .txt {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  color: #fff;
  position: absolute;
  left: -45px;
  right: -15px;
  bottom: 0;
  transition: left 200ms, right 200ms;
}

.dark-mode-toggle .btn-housing {
  width: 10px;
  height: 10px;
  border: 10px solid white;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transition: left 200ms, right 200ms;
}

.dark-mode-toggle .txt.on {
    left: -15px;
    right: -45px;
}

.dark-mode-toggle .btn-housing.on {
    left: 32px;
}

.drop-fade-enter-active, .drop-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.drop-fade-enter-from, .drop-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.drop-fade-enter-to, .drop-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
