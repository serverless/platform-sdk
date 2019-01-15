/*
 * Login
 * - Logs user in via CLI.
 * - Loads and updates data in user's .serverlessrc.
 */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const querystring = require('querystring')
const jwtDecode = require('jwt-decode')
const currentSdkVersion = require('../../package.json').version
const utils = require('../utils')
const openBrowser = require('./openBrowser')
const getTokens = require('./getTokens')
const platformConfig = require('../config')

const login = async () => {
  // Load local configuration file
  const configFile = utils.readConfigFile()
  if (!configFile) {
    throw new Error(
      `Serverless Enterprise requires a .serverlessrc file in the project's directory or root directory of this machine.`
    )
  }

  // Start local server to aide CLI sign-in/up
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
    redirect_uri: `${platformConfig.frontendUrl}callback`,
    scope: scope.join(' ')
  })
  const auth0Endpoint = `https://${AUTH0_DOMAIN}/authorize?${auth0Queries}`

  const opnRes = await openBrowser(auth0Endpoint)

  // Log in to Serverless Enterprise
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
  }).then((data) => {
    // Update user's config file (.serverlessrc)
    const decoded = jwtDecode(data.idToken)
    const id = decoded.tracking_id || decoded.sub
    configFile.userId = id
    configFile.users = configFile.users || {}
    configFile.users[id] = {
      userId: id,
      name: decoded.name,
      email: decoded.email,
      username: data.username,
      dashboard: data
    }

    // Add enterprise object
    configFile.users[id].enterprise = configFile.users[id].enterprise || {}
    configFile.users[id].enterprise.versionSDK = currentSdkVersion
    configFile.users[id].enterprise.timeLastLogin = Math.round(+new Date() / 1000)

    // Write updated data to .serverlessrc
    const updatedConfigFile = utils.writeConfigFile(configFile)

    // TODO: Log Stat

    return updatedConfigFile
  })
}

module.exports = login
