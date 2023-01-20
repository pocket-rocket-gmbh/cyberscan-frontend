<script setup>
import Navigation from "./components/navigation.vue";
</script>

<template>
  <div class="main">
    <Navigation />
    <RouterView />
  </div>
</template>

<script>
export default {
  components: {
    Navigation,
  },
};
</script>

<style scoped>
</style>
