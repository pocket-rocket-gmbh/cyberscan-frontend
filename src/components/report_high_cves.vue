<template>
      <div
      v-if="this.store.countHighCVEs > 0"
      class="flex flex-col items-center mx-auto max-w-7xl sm:px-6 lg:px-8 pb-10"
    >
      <h2>High Security Issues:</h2>
      <ul
        role="list"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="cve in ['test']"
          :key="cve"
          class="col-span-2 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-2 truncate">
              <div class="flex items-center space-x-4">
                <h3 class="truncate text-sm font-medium text-gray-900">
                  {{ cve }}
                </h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { useMainStore } from "@/stores/main";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
}
</script>

<style>

</style>