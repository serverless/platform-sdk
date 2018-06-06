const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const querystring = require('querystring')
const openBrowser = require('./openBrowser')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const server = app.listen(3000)

const PLATFORM_FRONTEND_BASE_URL = 'http://localhost:8000/'

const login = async () => {
  const queries = querystring.stringify({ cli: 'v2' })

  // openBrowser(`${PLATFORM_FRONTEND_BASE_URL}?${queries}`)

  return new Promise((resolve) => {
    app.post('/', (req, res) => {
      res.end()
      server.close()
      return resolve(req.body)
    })
  })
}

module.exports = login
