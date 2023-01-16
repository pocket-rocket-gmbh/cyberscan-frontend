<template>
  <button
    type="button"
    class="
      ml-3
      inline-flex
      items-center
      border border-transparent
      bg-theme-green
      px-10
      py-2
      text-sm
      font-medium
      text-white
      shadow-sm
      hover:bg-theme-green
      focus:outline-none focus:ring-1 focus:ring-black
    "
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
  },
};
</script>

<style>
</style>