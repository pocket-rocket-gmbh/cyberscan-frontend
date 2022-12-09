import { defineStore } from 'pinia'
import axios from 'axios'
import config from '../config'

function getDomainFromUrl(inputUrl) {
  let domain = ""
  if (inputUrl.indexOf("http") < 0) {
    inputUrl = "https://" + inputUrl
    domain = new URL(inputUrl)
  } else {
    domain = new URL(inputUrl)
  }
  return domain.hostname;
}

export const useMainStore = defineStore(
  'main', {
    state: () => ({
      domains: [],
      hosts: []
    }),
    getters: {
      getHosts() {
        return this.hosts;
      }
    },
    actions: {
      async startScanner(inputUrl) {
        let domain = getDomainFromUrl(inputUrl)
        console.log(config)
        let result = await axios.get(config.rootPath() + "actions/" + domain + '/start')
        return result;
      },
      getReport(inputUrl) {
        let domain = getDomainFromUrl(inputUrl)
        return domain;
      }
    }
  }
)
