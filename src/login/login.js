/*
 * Login
 * - Logs user in via CLI.
 * - Loads and updates data in user's .serverlessrc.
 */

import querystring from 'querystring'
import jwtDecode from 'jwt-decode'
import { version as currentSdkVersion } from '../../package.json'
import * as utils from '../utils'
import openBrowser from './openBrowser'
import { createAccessKeyForTenant } from '../accessKeys'
import platformConfig from '../config'
import loginIdentity from './loginIdentity'

const login = async (tenant) => {
  // Load local configuration file
  let configFile = utils.readConfigFile()
  if (!configFile) {
    throw new Error(
      `Serverless Enterprise requires a .serverlessrc file in the project's directory or root directory of this machine.`
    )
  }

  const loginIdentityPromises = loginIdentity()
  const transactionId = await loginIdentityPromises.transactionId

  const scope = ['openid', 'email_verified', 'email', 'profile', 'name', 'offline_access']

  const AUTH0_DOMAIN = platformConfig.auth0Domain

  const auth0Queries = querystring.stringify({
    audience: `https://${AUTH0_DOMAIN}/userinfo`,
    response_type: 'code',
    client_id: platformConfig.auth0ClientId,
    redirect_uri: `${platformConfig.frontendUrl}callback?transactionId=${transactionId}`,
    scope: scope.join(' ')
  })
  const auth0Endpoint = `https://${AUTH0_DOMAIN}/authorize?${auth0Queries}`

  await openBrowser(auth0Endpoint)

  const data = await loginIdentityPromises.loginData

  const decoded = jwtDecode(data.id_token)
  const id = decoded.tracking_id || decoded.sub
  configFile.userId = id
  configFile.users = configFile.users || {}
  configFile.users[id] = {
    userId: id,
    name: decoded.name,
    email: decoded.email,
    username: data.username,
    dashboard: {
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
      idToken: data.id_token,
      expiresAt: Date.now() + data.expires_in,
      username: decoded.nickname
    }
  }

  // Ensure accessKeys object exists
  if (!configFile.users[id].dashboard.accessKeys) {
    configFile.users[id].dashboard.accessKeys = {}
  }

  // Add enterprise object
  configFile.users[id].enterprise = configFile.users[id].enterprise || {}
  configFile.users[id].enterprise.versionSDK = currentSdkVersion
  configFile.users[id].enterprise.timeLastLogin = Math.round(+new Date() / 1000)

  // Write updated data to .serverlessrc
  let updatedConfigFile = utils.writeConfigFile(configFile)

  // If tenant is included, update config w/ new accesskey for that tenant
  let accessKey
  if (tenant && tenant !== 'tenantname') {
    accessKey = await createAccessKeyForTenant(tenant)
    if (accessKey) {
      configFile = utils.readConfigFile()
      configFile.users[id].dashboard.accessKeys[tenant] = accessKey
      updatedConfigFile = utils.writeConfigFile(configFile)
    }
  }

  // TODO: Log Stat

  return updatedConfigFile
}

module.exports = login
