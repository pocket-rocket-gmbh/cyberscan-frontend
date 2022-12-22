<template>
  <section>
    <header class="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      Found subdomains:
      {{ this.store.subdomains.length }}<br />
      Active Hosts:
      {{ this.store.hosts.length }}<br />
      Active Webservers:
      {{ this.store.webservers.length }}
    </header>
    <div v-if="this.store.high.length > 0" class="flex flex-col items-center mx-auto max-w-7xl sm:px-6 lg:px-8 pb-10">
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
    <div class="flex flex-col items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ul
        role="list"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="host in this.store.hosts"
          :key="host"
          class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-4">
                <h3 class="truncate text-sm font-medium text-gray-900">
                  {{ host }}
                </h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import { useMainStore } from "@/stores/main";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  created() {
    let inputUrl = localStorage.getItem("domain");
    if (inputUrl) {
      this.store.setInputUrl(inputUrl);
      this.store.waitForReport(inputUrl);
    }
  },
  components: {
    EllipsisVerticalIcon,
  },
};
</script>