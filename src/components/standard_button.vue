<template>
  <div
    :class="['button', 'clickable', addCSS]"
    @click="this.function"
  >
    {{ text }}
  </div>
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
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 100%;
  border: none;
  background-color: var(--theme-green);
  padding: 10px;
}
</style>