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
    techs: [],
    high: [],
    cves: [],
    structured: []
  }),
  actions: {
    setInputUrl(inputUrl) {
      this.inputUrl = inputUrl
      this.domain = getDomainFromUrl(inputUrl)
    },
    resetData() {
      this.subdomains = []
      this.webservers = []
      this.panels = []
      this.techs = []
      this.infos = []
      this.high = []
      this.cves = []
      this.structured = []
    },
    waitForReport(inputUrl) {
      if (this.requestTimer) {
        // clear timer
        this.getReport(inputUrl)
        clearTimeout(this.requestTimer)
        this.requestTimer = setTimeout(() => {
          this.waitForReport(inputUrl)
        }, 5 * 1000)
      } else {
        this.getReport(inputUrl)
        this.requestTimer = setTimeout(() => {
          this.waitForReport(inputUrl)
        }, 5 * 1000)
      }
    },
    async getReport(inputUrl) {
      function sortResultBasedOnIssues(structured) {
        return structured.sort((a, b) => {
          if (a.cves.length > 0 || b.cves.length > 0) {
            if (a.cves.length > b.cves.length) {
              return -1;
            } else if (a.cves.length < b.cves.length) {
              return 1;
            } else {
              return 0;
            }
          } else {
            if (a.urls.length > b.urls.length) {
              return -1;
            } else if (a.urls.length < b.urls.length) {
              return 1;
            } else {
              return 0;
            }
          }
        })
      }
      let result = await this.getReportFromApi(inputUrl)
      if (result.data) {
        this.subdomains = result.data.subdomains || []
        this.hosts = result.data.hosts || []
        this.webservers = result.data.webservers || []
        this.panels = result.data.panels || []
        this.techs = result.data.techs || []
        this.high = result.data.high || []
        this.cves = result.data.cves || []
        this.structured = sortResultBasedOnIssues(result.data.structured || [])
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
