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
  const beginLoginQueries = querystring.stringify({ cli: 'true' })
  const endLoginQueries = querystring.stringify({ cli: 'true', cliLoginSuccessful: 'true' })

  const opnRes = await openBrowser(`${platformConfig.frontendUrl}?${beginLoginQueries}`)

  return new Promise((resolve) => {
    app.get('/', (req, res) => {
      if (opnRes) opnRes.kill()
      opnRes.kill()
      res.redirect(`${platformConfig.frontendUrl}?${endLoginQueries}`)
      res.end()
      server.close()
      return resolve(req.query)
    })
  })
}

module.exports = login
