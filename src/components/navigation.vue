<template>
  <div class="navigation">
    <div class="logo">
      <img src="/img/logo.svg" alt="Company Logo" />
    </div>
    <div class="software-name">
      CYBER<br />
      SECURITY<br />
      SCANNER
    </div>
    <div class="linklist">
      <router-link
        :class="[
          this.isActiveRoute('main') ? 'navlink-active' : '',
          'uppercase',
        ]"
        to="/"
      >
        Über Knox
      </router-link>
      <router-link
        :class="[
          this.isActiveRoute('scanner') ? 'navlink-active' : '',
          'uppercase',
        ]"
        to="/report"
      >
        Scan
      </router-link>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/stores/main";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  created() {
    setTimeout(() => {
      this.showStatusBanner();
    }, 1000);
  },
  data() {
    return {
      open: false,
      showBanner: true,
    };
  },
  methods: {
    isActiveRoute(name) {
      if (name == this.$route.name || !this.$route.name) {
        return true;
      }
      return false;
    },
    showStatusBanner() {
      if (this.store.countHosts == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir untersuchen die Domain...";
      } else if (this.store.countWebservers == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir suchen nach aktiven Webanwendungen...";
      } else if (this.store.countCVEs == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir suchen nach Sicherheitslücken...";
      }

      setTimeout(() => {
        this.showStatusBanner();
      }, 5 * 1000);
    },
  },
};
</script>

<style scoped>
.navigation {
  margin: 50px 0px;
  height: 50px;
  display: flex;
}

.logo img {
  height: 50px;
}

.software-name {
  font-size: 90%;
  margin-left: 10px;
  align-items: center;
  display: flex;
}

.linklist {
  text-transform: uppercase;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  gap: 10px;
  flex-wrap: wrap;
}

.linklist > * + * {
  margin-left: 10px;
}

.navlink-active {
  color: #fff;
}

.info-banner {
  position: relative;
  width: 100%;
}
</style>