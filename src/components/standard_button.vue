<template>
  <button
    type="button"
    class="
      ml-3
      inline-flex
      items-center
      rounded-md
      border border-transparent
      bg-green-700
      px-10
      py-2
      text-sm
      font-medium
      text-white
      shadow-sm
      hover:bg-green-600
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
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