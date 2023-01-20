<template>
  <section class="relative">
    <router-link class="backlink" to="/">Zurück zum Scanner</router-link>
    <StandardButton
      text="Re-Scan"
      :function="this.startScanner"
      addCSS="button-rescan"
    />
    <ReportOverview></ReportOverview>
    <ReportHighCVEs></ReportHighCVEs>
    <div class="flex flex-col items-center mx-auto max-w-7xl sm:px-6 lg:px-8">
      <ul
        role="list"
        class="cards"
      >
        <li
          v-for="host in this.store.structured"
          :key="host"
          class="card"
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
import { useMainStore } from "@/stores/main";
import Navigation from "@/components/navigation.vue";
import ReportOverview from "@/components/report_overview.vue";
import ReportHighCVEs from "@/components/report_high_cves.vue";
import StandardButton from "@/components/standard_button.vue";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  data() {
    return {
      inputUrl: "http://www.bundeswehr.de",
    };
  },
  components: {
    Navigation,
    ReportOverview,
    ReportHighCVEs,
    StandardButton,
  },
  created() {
    let inputUrl = localStorage.getItem("domain");
    if (inputUrl) {
      this.inputUrl = inputUrl;
      this.store.waitForReport(this.inputUrl);
    }
  },
  methods: {
    async startScanner() {
      this.store.resetData();
      this.store.startScanner(this.inputUrl);
      this.store.waitForReport(this.inputUrl);
      localStorage.setItem("domain", this.inputUrl);
    },
  },
};
</script>

<style scoped>
.button-rescan {
  background-color: #CCC;
  padding: 10px;
  margin: 0 auto;
}

.cards {
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  list-style: none;
  padding-left: 0px; 
}

.card {
  background-color: red;
  padding: 20px;
}

.backlink {
  position: absolute;
  left: 0;
  top: 10px;
}

@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
</style>