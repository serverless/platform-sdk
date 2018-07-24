const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const querystring = require('querystring')
const openBrowser = require('./openBrowser')
const getTokens = require('./getTokens')
const platformConfig = require('../config')

const login = async () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(cors())
  const server = app.listen(8000)
  let refreshToken

  const scope = ['openid', 'email_verified', 'email', 'profile', 'name', 'offline_access']

  const AUTH0_DOMAIN = platformConfig.auth0Domain

  const auth0Queries = querystring.stringify({
    audience: `https://${AUTH0_DOMAIN}/userinfo`,
    response_type: 'code',
    client_id: platformConfig.auth0ClientId,
    redirect_uri: 'http://localhost:8000/',
    scope: scope.join(' ')
  })
  const auth0Endpoint = `https://${AUTH0_DOMAIN}/authorize?${auth0Queries}`

  const opnRes = await openBrowser(auth0Endpoint)

  return new Promise((resolve) => {
    app.get('/', async (req, res) => { // eslint-disable-line
      if (opnRes) {
        opnRes.kill()
      }
      if (req.query.code) {
        const tokens = await getTokens(req.query.code)
        refreshToken = tokens.refresh_token
        const queriesObj = {
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          expiresIn: tokens.expires_in,
          cli: true,
          cliAuthed: true
        }
        const tokensQueries = querystring.stringify(queriesObj)
        res.redirect(`${platformConfig.frontendUrl}callback?${tokensQueries}`)
        res.end()
      } else {
        const endLoginQueries = querystring.stringify({
          cli: 'true',
          cliLoginSuccessful: 'true'
        })
        res.redirect(`${platformConfig.frontendUrl}?${endLoginQueries}`)
        res.end()
        server.close()
        const tokens = {
          refreshToken,
          ...req.query
        }
        tokens.expiresAt = Number(req.query.expiresAt)
        return resolve(tokens)
      }
    })
  })
}

module.exports = login
