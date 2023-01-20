<template>
  <button
    type="button"
    :class=[addCSS]
    @click="this.function"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: String,
    function: Function,
    addCSS: {
      default: "",
      type: String
    }
  },
};
</script>

<style scoped>
button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 100%;
  border: none;
  background-color: var(--theme-green);
}
</style>