/*
 * Logout
 * - Logs user out.
 * - Loads and updates data in user's .serverlessrc.
 */

const currentSdkVersion = require('../../package.json').version
const utils = require('../utils')

const logout = async () => {
  // Load local configuration file
  const configFile = utils.readConfigFile()
  if (!configFile) {
    return
  }

  if (configFile.userId && configFile.users) {
    const loggedInUser = configFile.users[configFile.userId]

    // Update dashboard data
    if (loggedInUser.dashboard) {
      loggedInUser.dashboard.accessToken = null
      loggedInUser.dashboard.idToken = null
      loggedInUser.dashboard.expiresAt = null
    }

    // Update enterprise data
    loggedInUser.enterprise = loggedInUser.enterprise || {}
    loggedInUser.enterprise.versionSDK = currentSdkVersion
    loggedInUser.enterprise.timeLastLogout = Math.round(+new Date() / 1000)
  }

  // Write updated data to .serverlessrc
  const updatedConfigFile = utils.writeConfigFile(configFile)

  // TODO: Log Stat

  return updatedConfigFile
}

module.exports = { logout }
