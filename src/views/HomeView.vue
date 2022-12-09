<template>
  <main>
    <h1>Cyberscan</h1>
    <input
      ref="inputUrl"
      type="url"
      placeholder="https://www.pocket-rocket.io"
      value="https://www.pocket-rocket.io"
    />
    <input type="button" value="Start scanning" @click="startScanner" />
  </main>
</template>

<script>
import { useMainStore } from "@/stores/main";

export default {
  methods: {
    startScanner() {
      const store = useMainStore();
      let inputUrl = this.$refs.inputUrl.value;
      let test = store.startScanner(inputUrl);
      console.log("input", test);
      this.$router.push("running");
    },
  },
};
</script>