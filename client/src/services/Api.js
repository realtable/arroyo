import axios from 'axios'

export default {
  fetch(url) {
    return axios.create({
      baseURL: process.env.VUE_APP_LOCAL ? 'http://localhost:8081' : 'https://arroyo-server.realtable.now.sh'
    }).get(`/api/index.js?fd=${url}`)
  }
}