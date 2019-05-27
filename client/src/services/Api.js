import axios from 'axios'

export default {
  fetch(url) {
    return axios.create({
      baseURL: process.env.VUE_APP_PROD ? 'https://arroyo-server.realtable.now.sh' : 'http://localhost:8081'
    }).get(`/api/index.js?fd=${url}`)
  }
}