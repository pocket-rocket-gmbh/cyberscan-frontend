<template>
  <section>
    <header class="space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <div class="flex flex-col items-center">
        <form class="group relative md:w-1/2 w-full">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            class="
              absolute
              left-3
              top-1/2
              text-slate-400
              pointer-events-none
              group-focus-within:text-blue-500
            "
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            class="
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              appearance-none
              w-full
              text-sm
              leading-6
              text-slate-900
              placeholder-slate-400
              rounded-md
              py-2
              pl-10
              ring-1 ring-slate-200
              shadow-sm
            "
            v-model="inputUrl"
            type="url"
            placeholder="https://www.pocket-rocket.io"
            aria-label="Filter projects"
          />
        </form>
        <StandardButton
          class="mt-10"
          text="Start Scanning"
          :function="this.startScanner"
        />
        <StandardButton
          class="mt-10"
          text="Show report"
          :function="this.showReport"
        />
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
      inputUrl: "www.pocket-rocket.io"
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