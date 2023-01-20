<template>
  <section>
    <header class="row">
      <div class="col">
        <div class="headline">
          <span class="font-white"> Sicherheit für deine Systeme. </span><br />
          Jetzt scannen!
        </div>
        <form class="flex input-form">
          <div class="input-http">https</div>
          <input
            class="input-domain"
            v-model="inputUrl"
            type="url"
            placeholder="www.pocket-rocket.io"
          />
          <StandardButton
            text="Scan"
            :function="this.checkScanner"
            addCSS="icon-search button-bigger"
          />
        </form>
      </div>
      <div class="col hidden-mobile">
        <div class="star">
          <img src="/img/star.svg" />
        </div>
        <div class="eye-container">
          <div class="eye">
            <svg
              width="368"
              height="202"
              viewBox="0 0 368 202"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 100.98C101.514 -33.6156 265.99 -33.6156 367.37 100.98C265.99 235.442 101.514 235.442 0 100.98Z"
                fill="white"
              />
              <path
                class="eye-svg"
                d="M183.685 149.402C224.941 149.402 258.386 115.958 258.386 74.7012C258.386 33.4449 224.941 0 183.685 0C142.429 0 108.984 33.4449 108.984 74.7012C108.984 115.958 142.429 149.402 183.685 149.402Z"
                fill="#1E1F1C"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import Navigation from "../components/navigation.vue";
import { useMainStore } from "@/stores/main";
import StandardButton from "../components/standard_button.vue";

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
    StandardButton,
  },
  created() {
    let inputUrl = localStorage.getItem("domain");
    if (inputUrl) {
      this.inputUrl = inputUrl;
    }
  },
  methods: {
    async checkScanner() {
      this.store.resetData();
      let result = await this.store.checkScanner(this.inputUrl);
      this.store.waitForReport(this.inputUrl);
      localStorage.setItem("domain", this.inputUrl);
      if (result) {
        this.store.bannerText = "";
        this.$router.push("report");
      }
    },
  },
};
</script>

<style scoped>
.icon-search::before {
  content: "";
  background-image: url("/img/search.svg");
  background-size: 20px 20px;
  height: 20px;
  width: 20px;
  margin: 5px;
}

.button-bigger {
  min-width: 100px;
}

.headline {
  max-width: 500px;
  font-size: 350%;
}

.star {
  position: absolute;
  right: 50px;
}

.star img {
  height: 70px;
}

.input-form {
  height: 50px;
  margin-top: 50px;
}

.input-http {
  background-color: #ddd;
  color: #999;
  padding: 15px;
  font-size: 105%;
}

.input-domain {
  flex: 1;
  font-size: 105%;
  border: none;
  padding: 10px;
}

.eye-container {
  margin: 0 auto;
  display: flex;
  max-width: 400px;
  height: 600px;
  background: #1d1d1b;
  border-radius: 400px;
}

.eye {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.eye svg {
  max-width: 300px;
}

.eye-svg {
  animation: eye 90s ease infinite;
}

@keyframes eye {
  0% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(-20px, 40px);
  }
  50% {
    transform: translate(30px, 20px);
  }
}
</style>