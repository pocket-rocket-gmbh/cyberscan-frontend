<template>
  <header class="relative">
    <img class="eye-small" src="/img/eye-small.svg" />
    <div class="status-text">Scan ist {{ this.store.status }}</div>
    <div class="stats-container">
      <div class="subdomains">
        <span class="count font-white"> {{ this.store.countSubs }}<br /> </span>
        Subdomains
      </div>
      <div class="hosts">
        <span class="count font-white">
          {{ this.store.countHosts }}<br />
        </span>
        Aktive Hosts
      </div>
      <div class="webservers">
        <span class="count font-white">
          {{ this.store.countWebservers }}<br />
        </span>
        Aktive Webserver
      </div>
      <div class="statistics">
        <SecureStatistic></SecureStatistic>
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
  text-align: center;
}
.count {
  font-size: 300%;
}
.eye-small {
  margin: 5px auto;
  display: block;
}
.status-text {
  text-align: center;
  color: #fff;
  font-size: 200%;
}
</style>