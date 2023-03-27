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
    hosts: [],
    stats: {},
    status: null
  }),
  actions: {
    setInputUrl(inputUrl) {
      this.inputUrl = inputUrl
      this.domain = getDomainFromUrl(inputUrl)
    },
    resetData() {
      clearTimeout(this.requestTimer)
      this.requestTimer = null
      this.countSubs = 0
      this.countHosts = 0
      this.countWebservers = 0
      this.countCVEs = 0
      this.countHighCVEs = 0
      this.structured = []
      this.status = null
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
          if (a.alerts.length > 0 || b.alerts.length > 0) {
            if (a.alerts.length > b.alerts.length) {
              return -1;
            } else if (a.alerts.length < b.alerts.length) {
              return 1;
            } else {
              return 0;
            }
          }
        })
      }
      let result = await this.getReportFromApi(inputUrl)
      if (result.data) {
        this.stats = result.data.stats
        this.status = result.data.status
        this.hosts = sortResultBasedOnIssues(result.data.hosts)
        return true;
      } else {
        return false;
      }
    },
    async startScanner(inputUrl) {
      let domain = getDomainFromUrl(inputUrl)
      let result = await (await axios.get(config.rootPath() + "security/" + domain + '/scan'), { withCredentials: true })
      return result;
    },
    async checkScanner(inputUrl) {
      let report = await this.getReportFromApi(inputUrl)
      if (report.data.hosts.length > 0) {
        return { status: "Running" };
      }
      let domain = getDomainFromUrl(inputUrl)
      let result = await axios.get(config.rootPath() + "security/" + domain + '/scan', { withCredentials: true })
      return result;
    },
    async getReportFromApi(inputUrl) {
      let domain = getDomainFromUrl(inputUrl)
      let result = await axios.get(config.rootPath() + "security/" + domain + '/report', { withCredentials: true })
      return result;
    }
  }
})
