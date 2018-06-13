const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const querystring = require('querystring')
const openBrowser = require('./openBrowser')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const server = app.listen(8000)

const PLATFORM_FRONTEND_BASE_URL = 'http://localhost:3000/'

const login = async () => {
  const queries = querystring.stringify({ cli: 'v2' })

  const opnRes = await openBrowser(`${PLATFORM_FRONTEND_BASE_URL}?${queries}`)

  return new Promise((resolve) => {
    app.post('/', (req, res) => {
      opnRes.kill()
      res.end()
      server.close()
      return resolve(req.body)
    })
  })
}

module.exports = login
