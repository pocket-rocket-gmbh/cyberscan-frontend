<template>
  <section class="relative">
    <router-link class="backlink" to="/">Zurück zum Scanner</router-link>
    <StandardButton
      text="Re-Scan"
      :function="this.startScanner"
      addCSS="button-rescan"
    />
    <img class="eye-small" src="/img/eye-small.svg" />
    <ReportOverview></ReportOverview>
    <div>
      <ul class="cards">
        <li
          :class="['card', this.returnCSSByAlertSeverity(host.alerts)]"
          v-for="host in this.store.structured"
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
              class="card-headline card-headline-security"
              v-if="host.alerts.length > 0"
            >
              Sicherheit:
            </div>
            <div class="card-alert" v-for="alert in host.alerts" :key="alert">
              {{ alert.title }}<br />
              {{ alert.url }}<br />
              Risiko:<br />
              {{ alert.severity }}
              <span v-if="alert.description">
                <br />
                Beschreibung:<br />
                {{ alert.description }}
              </span>
              <span v-if="alert.cve">
                <br />
                CVE:<br />
                {{ alert.cve }}
              </span>
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