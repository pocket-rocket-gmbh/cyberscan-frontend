<script setup>
import Navigation from './components/navigation.vue'
</script>

<template>
  <Navigation />
  <RouterView />
</template>

<script>
export default {
  components: {
    Navigation
  }
}
</script>

<style scoped>
</style>
