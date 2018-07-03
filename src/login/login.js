const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const querystring = require('querystring')
const openBrowser = require('./openBrowser')
const platformConfig = require('../config')

const login = async () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  const server = app.listen(8000)
  const queries = querystring.stringify({ cli: 'true' })

  const opnRes = await openBrowser(`${platformConfig.frontendUrl}?${queries}`)

  return new Promise((resolve) => {
    app.post('/', (req, res) => {
      if (opnRes) {
        opnRes.kill()
      }
      res.end()
      server.close()
      return resolve(req.body)
    })
  })
}

module.exports = login
