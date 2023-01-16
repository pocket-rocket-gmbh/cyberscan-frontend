<template>
  <section>
    <header class="p-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
      Found subdomains:
      {{ this.store.countSubs }}<br />
      Active Hosts:
      {{ this.store.countHosts }}<br />
      Active Webservers:
      {{ this.store.countWebservers }}
    </header>
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
            host.alerts.length > 0 ? 'ring-2 ring-red-500' : '',
          ]"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-3">
            <div class="flex-1 break-all">
              <div class="flex items-center space-x-4">
                <h2 class="font-medium text-gray-900">
                  {{ host.host }}
                </h2>
              </div>
              <div
                class="overflow-hidden text-sm"
                v-for="webserver in host.webservers"
                :key="webserver"
              >
                <a
                  target="_blank"
                  class="underline decoration-1"
                  :href="webserver.url"
                >
                  {{ webserver.url }}
                </a>
                {{ webserver.title }}<br />
                {{ webserver.server }}<br />
                {{ webserver.statusCodes }}<br />
                {{ webserver.network }}
              </div>
              <div v-for="alert in host.alerts" :key="alert">
                Title: {{ alert.title }}<br />
                URL: {{ alert.url }}<br />
                Rish: {{ alert.severity }}<br />
                Description: {{ alert.description }}<br />
                CVE: {{ alert.cve }}
              </div>
              <div v-for="panel in host.panels" :key="panel">
                {{ panel.name }}<br />
                {{ panel.url }}
              </div>
              <div v-for="tech in host.techs" :key="tech">
                {{ tech.name
                }}<span v-if="tech.value"> = {{ tech.value }} </span>
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
import StandardButton from "../components/standard_button.vue";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      inputUrl: "http://www.bundeswehr.de"
    }
  },
  components: {
    Navigation,
    StandardButton,
  },
  created() {
    let inputUrl = localStorage.getItem("domain")
    if (inputUrl) {
      this.inputUrl = inputUrl
    }
  },
  methods: {
    async startScanner() {
      this.store.resetData()
      let result = await this.store.startScanner(this.inputUrl)
      this.store.waitForReport(this.inputUrl)
      localStorage.setItem("domain", this.inputUrl)
      if (result) {
        this.store.bannerText = ""
        this.$router.push("report")
      }
    },
    showReport() {
      this.store.resetData()
      this.store.waitForReport(this.inputUrl)
      localStorage.setItem("domain", this.inputUrl)
      this.store.bannerText = ""
      this.$router.push("report")
    }
  },
};
</script>