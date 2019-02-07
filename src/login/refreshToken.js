import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import utils from '../utils'
import { version as currentVersion } from '../../package.json'
import { checkHttpResponse } from '../utils'

const refreshToken = async () => {
  const configFile = utils.readConfigFile()
  const currentId = configFile.userId

  // id token not expired, no need to renew
  if (Number(configFile.users[currentId].dashboard.expiresAt) > Date.now()) {
    return
  }

  const body = JSON.stringify({ refreshToken: configFile.users[currentId].dashboard.refreshToken })
  const response = await fetch(`${platformConfig.backendUrl}tokens/refresh`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'x-platform-version': currentVersion
    }
  })

  await checkHttpResponse(response)

  const tokens = await response.json()
  const expiresAt = tokens.expires_in * 1000 + Date.now()
  configFile.users[currentId].dashboard.idToken = tokens.id_token
  configFile.users[currentId].dashboard.accessToken = tokens.access_token
  configFile.users[currentId].dashboard.expiresAt = expiresAt
  utils.writeConfigFile(configFile)
}

module.exports = refreshToken
