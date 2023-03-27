<template>
  <section class="relative">
    <router-link class="backlink" to="/">Zurück zum Scanner</router-link>
    <StandardButton
      text="Re-Scan"
      :function="this.startScanner"
      addCSS="button-rescan"
    />
    <svg
      :class="['eye-small', this.store.stats?.alerts > 0 ? 'eye-active' : '']"
      width="104"
      height="137"
      viewBox="0 0 104 137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        class="eye-element"
        width="103.024"
        height="137"
        rx="51.512"
        fill="#1D1D1B"
      />
      <path
        d="M17.9014 71.4191C36.4445 46.833 66.4888 46.833 85.0076 71.4191C66.4888 95.9809 36.4445 95.9809 17.9014 71.4191Z"
        fill="white"
      />
      <path
        class="eye-element"
        d="M51.4545 80.2642C58.9907 80.2642 65.0999 74.1549 65.0999 66.6188C65.0999 59.0826 58.9907 52.9733 51.4545 52.9733C43.9183 52.9733 37.8091 59.0826 37.8091 66.6188C37.8091 74.1549 43.9183 80.2642 51.4545 80.2642Z"
        fill="#1D1D1B"
      />
    </svg>

    <ReportOverview></ReportOverview>
    <div>
      <ul class="cards">
        <li
          :class="['card', this.returnCSSByAlertSeverity(host.alerts)]"
          v-for="host in this.store.hosts"
          :key="host"
        >
          <div>
            <h2 class="card-title">
              {{ host.host }}
            </h2>
            <div
              class="card-webserver"
              v-for="webserver in host.webservers"
              :key="webserver"
            >
              {{ webserver.title }} <br />
              <a class="card-link" target="_blank" :href="webserver.url">
                {{ webserver.url }}
              </a>
              ({{ webserver.statusCodes }})
              <br />
              <span v-if="webserver.server">
                Server: {{ webserver.server }}
              </span>
              <span v-if="webserver.network">
                <br />
                Netzwerk: <br />
                {{ webserver.network }}
              </span>
            </div>

            <div
              class="card-alert top-spacer"
              v-for="alert in host.alerts"
              :key="alert"
            >
              <span class="card-headline-security">{{ alert.title }}</span>
              <div class="font-small font-red">
                Risiko: {{ alert.severity }}
              </div>
              <div class="font-small">
                {{ alert.url }}
              </div>

              <div class="font-small" v-if="alert.description">
                Beschreibung: {{ alert.description }}
              </div>
              <div class="font-small font-red" v-if="alert.cve">
                {{ alert.cve }}
              </div>
            </div>
            <div class="card-panel" v-for="panel in host.panels" :key="panel">
              {{ panel.name }}<br />
              {{ panel.url }}
            </div>
            <div class="card-headline" v-if="host.techs.length > 0">
              Technologie:
            </div>
            <div class="card-tech" v-for="tech in host.techs" :key="tech">
              {{ tech.name }}<span v-if="tech.value"> = {{ tech.value }} </span>
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
      inputUrl: "",
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
    returnCSSByAlertSeverity(alerts) {
      for (let alert of alerts) {
        if (alert.severity) {
          return alert.severity;
        }
      }
      return "";
    },
  },
};
</script>

<style scoped>
.button-rescan {
  background-color: #ccc;
  padding: 10px;
  position: absolute;
  right: 0px;
}

.eye-small {
  margin: 5px auto;
  display: block;
}

.cards {
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  list-style: none;
  padding-left: 0px;
}

.card {
  background-color: #fff;
  padding: 20px;
  word-break: break-word;
}

.card-webserver {
  background-color: #eee;
  padding: 3px 10px;
}

.card-webserver,
.card-panel {
  margin-top: 10px;
}

.card-headline {
  font-size: 120%;
  margin-top: 10px;
  margin-bottom: 1px;
}

.high {
  border-bottom: 5px solid var(--theme-red);
}
.critical {
  border-bottom: 5px solid var(--theme-red);
}

.card-headline-security {
  color: var(--theme-red);
}

.medium {
  border-bottom: 3px solid #fdd400;
}

.card-title {
  font-size: 18px;
}

.card-link {
  text-decoration: underline;
}

.backlink {
  position: absolute;
  left: 0;
  top: 10px;
}

.eye-active .eye-element {
  fill: var(--theme-red);
}

@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>