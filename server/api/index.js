const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const request = require('request')
const parser = require('xml2js').parseString
const handler = require('./handler.js')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

if (process.env.VUE_PROD) {
  let whitelist = ['https://arroyo-client.realtable.now.sh', 'https://arroyo.now.sh']
  app.use(cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }))
} else {
  app.use(cors())
}

app.get('*', (req, res) => {
  let url = req.query.fd
  request(url, (err, stream, body) => {
    if (err) {
      res.send(400, 'Invalid URL')
    } else {
      parser(body, (err, json) => {
        if (err) {
          res.send(500, 'Unable to parse XML')
        } else {
          res.set('Content-Type', 'application/json')
          res.send(200, handler(json, url))
        }
      })
    }
  })
})

module.exports = app
