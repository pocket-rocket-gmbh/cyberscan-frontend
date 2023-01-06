<template>
  <Disclosure as="nav" class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              p-2
              text-gray-400
              hover:bg-gray-700 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="
            flex flex-1
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto"
              src="/img/rocket.svg"
              alt="Company Logo"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link
                :class="[
                  this.isActiveRoute('info')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                to="/"
                >Info</router-link
              >
              <router-link
                :class="[
                  this.isActiveRoute('scanner')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                to="/scanner"
                >Scanner</router-link
              >
              <router-link
                :class="[
                  this.isActiveRoute('report')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                to="/report"
                >Report</router-link
              >
            </div>
          </div>
        </div>
        <div
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            sm:static sm:inset-auto sm:ml-6 sm:pr-0
          "
        >
          <button
            type="button"
            class="
              rounded-full
              bg-gray-800
              p-1
              text-gray-400
              hover:text-white
              focus:outline-none
              focus:ring-2
              focus:ring-white
              focus:ring-offset-2
              focus:ring-offset-gray-800
            "
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <router-link
          :class="[
            this.isActiveRoute('info')
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          to="/"
          >Info</router-link
        >
        <router-link
          :class="[
            this.isActiveRoute('scanner')
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          to="/scanner"
          >Scanner</router-link
        >
        <router-link
          :class="[
            this.isActiveRoute('report')
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          to="/report"
          >Report</router-link
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div
    v-if="this.store.bannerText.length > 0 && this.showBanner"
    class="relative bg-indigo-600"
  >
    <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
      <div class="pr-16 sm:px-16 sm:text-center">
        <p class="font-medium text-white">
          {{ this.store.bannerText }}
        </p>
      </div>
      <div
        class="
          absolute
          inset-y-0
          right-0
          flex
          items-start
          pt-1
          pr-1
          sm:items-start sm:pt-1 sm:pr-2
        "
      >
        <button
          type="button"
          class="
            flex
            rounded-md
            p-2
            hover:bg-indigo-500
            focus:outline-none focus:ring-2 focus:ring-white
          "
          @click="this.showBanner = false"
        >
          <span class="sr-only">Dismiss</span>
          <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
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
      if (name == this.$route.name) {
        return true;
      }
      return false;
    },
    showStatusBanner() {
      if (this.store.hosts == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir untersuchen die Domain...";
      } else if (this.store.webservers.length == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir suchen nach aktiven Webanwendungen...";
      } else if (this.store.techs.length == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir untersuchen aktive Webanwendungen...";
      } else if (this.store.cves.length == 0) {
        this.showBanner = true;
        this.store.bannerText = "Wir suchen nach Sicherheitslücken...";
      }

      setTimeout(() => {
        this.showStatusBanner();
      }, 5 * 1000);
    },
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    BellIcon,
    XMarkIcon,
  },
};
</script>