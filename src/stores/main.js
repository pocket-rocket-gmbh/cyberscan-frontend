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
    inputUrl: null,
    requestTimer: null,
    domain: null,
    bannerText: "",
    subdomains: [],
    hosts: [],
    webservers: [],
    panels: [],
    infos: [],
    high: [],
    cves: []
  }),
  actions: {
    setInputUrl(inputUrl) {
      this.inputUrl = inputUrl
      this.domain = getDomainFromUrl(inputUrl)
    },
    waitForReport(inputUrl) {
      if (this.requestTimer) {
        // clear timer
        clearTimeout(this.requestTimer)
        this.requestTimer = null
      } else {
        this.getReport(inputUrl)
      }
      setTimeout(() => {
        this.waitForReport(inputUrl)
      }, 3 * 1000)
    },
    async getReport(inputUrl) {
      let result = await this.getReportFromApi(inputUrl)
      if (result.data) {
        this.subdomains = result.data.subdomains || []
        this.hosts = result.data.hosts || []
        this.webservers = result.data.webservers || []
        this.panels = result.data.panels || []
        this.infos = result.data.infos || []
        this.high = result.data.high || []
        this.cves = result.data.cves || []
        return true;
      } else {
        return false;
      }
    },
    async startScanner(inputUrl) {
      let domain = getDomainFromUrl(inputUrl)
      let result = await axios.get(config.rootPath() + "actions/" + domain + '/start')
      return result;
    },
    async getReportFromApi(inputUrl) {
      let domain = getDomainFromUrl(inputUrl)
      let result = await axios.get(config.rootPath() + "reports/" + domain)
      return result;
    }
  }
}
)
