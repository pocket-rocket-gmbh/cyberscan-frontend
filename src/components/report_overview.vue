<template>
  <header class="relative">
    <div class="status-text">Scan is {{ this.store.status }}</div>
    <div class="stats-container">
      <div class="subdomains">
        <span class="count font-white"> {{ this.store.stats?.subdomains }}<br /> </span>
        Subdomains
      </div>
      <div class="hosts">
        <span class="count font-white">
          {{ this.store.stats?.hosts }}<br />
        </span>
        Aktive Hosts
      </div>
      <div class="webservers">
        <span class="count font-white">
          {{ this.store.stats?.webserver }}<br />
        </span>
        Aktive Webserver
      </div>
      <div class="statistics">
        <SecureStatistic
          :alerts="
            this.store.hosts
              .map((item) => item.alerts)
              .filter((alert) => alert)
          "
        >
        </SecureStatistic>
      </div>
    </div>
  </header>
</template>

<script>
import { useMainStore } from "@/stores/main";
import SecureStatistic from "@/components/security_statistic.vue";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  components: {
    SecureStatistic,
  },
};
</script>

<style scoped>
.stats-container {
  margin: 20px 0px;
  display: grid;
  grid-template-columns: auto auto auto 50%;
  justify-items: center;
  align-items: center;
}
.subdomains,
.hosts,
.webservers {
  border-right: 2px solid #fff;
  text-align: center;
  padding: 20px;
}
.count {
  font-size: 300%;
}
.status-text {
  text-align: center;
  color: #fff;
  font-size: 200%;
}
</style>