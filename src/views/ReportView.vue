<template>
  <section>
    <header class="p-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
      Found subdomains:
      {{ this.store.subdomains.length }}<br />
      Active Hosts:
      {{ this.store.hosts.length }}<br />
      Active Webservers:
      {{ this.store.webservers.length }}
    </header>
    <div
      v-if="this.store.high.length > 0"
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
    <div class="flex flex-col items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ul
        role="list"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="host in this.store.structured"
          :key="host"
          :class="[
            'm-1 lg:m-0 col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow',
            host.cves.length > 0 ? 'ring-2 ring-red-500' : '',
          ]"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-3">
            <div class="flex-1 break-all">
              <div class="flex items-center space-x-4">
                <h2 class="font-medium text-gray-900">
                  {{ host.host }}
                </h2>
              </div>
              <div class="overflow-hidden text-sm" v-if="host.urls.length > 0">
                <a
                  target="_blank"
                  class="underline decoration-1"
                  :href="host.urls[0]"
                  >{{ host.urls[0].substring(0, 100) }}</a
                >
              </div>
              <p class="text-rose-600">{{ host.high.join(", ") }}</p>
              <p class="text-rose-600">{{ host.cves.join(", ") }}</p>
              <div v-for="tech in host.techs" :key="tech">
                * {{ tech.key }} = {{ tech.value }}<br/>
              </div>
              <p>{{ host.servers.join(", ") }}</p>
              <p>{{ host.networks.join(", ") }}</p>
              <p>{{ host.ips.join(", ") }}</p>
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