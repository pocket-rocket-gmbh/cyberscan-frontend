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
    countSubs: 0,
    countHosts: 0,
    countWebservers: 0,
    countCVEs: 0,
    countHighCVEs: 0,
    structured: [],
    status: null
  }),
  actions: {
    setInputUrl(inputUrl) {
      this.inputUrl = inputUrl
      this.domain = getDomainFromUrl(inputUrl)
    },
    resetData() {
      clearTimeout(this.requestTimer)  
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
        this.countSubs = result.data.subdomains
        this.countSubs = result.data.countSubs
        this.countHosts = result.data.countHosts
        this.countWebservers = result.data.countWebservers
        this.countCVEs = result.data.countCVEs
        this.countHighCVEs = result.data.countHighCVEs
        this.status = result.data.status
        this.structured = sortResultBasedOnIssues(result.data.structured)

        // filter webservers if they only redirect
        // for (let index = 0; index < this.structured.length; index++) {
        //   this.structured[index].webservers = this.structured[index].webservers.filter(webserver => webserver.statusCodes.indexOf("200") >= 0)
        // }
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
})
