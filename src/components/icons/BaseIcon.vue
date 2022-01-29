<template>
  <i class="icon">
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    label: String,
  },
};
</script>

<style>
.icon {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}

.icon > svg {
  display: inline-block;
  width: 1.125rem;
  height: 1rem;
}
</style>
