import axios from 'axios'

export default {
  fetch(url) {
    return axios.create({
      baseURL: 'https://arroyo-server.realtable.now.sh'
    }).get(`/api/index.js?fd=${url}`)
  }
}