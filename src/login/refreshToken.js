import fetch from '../fetch'
import platformConfig from '../config'
import * as utils from '../utils'

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
    body
  })

  const tokens = await response.json()
  const expiresAt = tokens.expires_in * 1000 + Date.now()
  configFile.users[currentId].dashboard.idToken = tokens.id_token
  configFile.users[currentId].dashboard.accessToken = tokens.access_token
  configFile.users[currentId].dashboard.expiresAt = expiresAt
  utils.writeConfigFile(configFile)
}

module.exports = refreshToken
