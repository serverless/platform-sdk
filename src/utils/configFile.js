import os from 'os'
import path from 'path'
import { path as get, pick, mergeDeepRight } from 'ramda'
import writeFileAtomic from 'write-file-atomic'

// Locate the correct .serverlessrc per current environment
let appName = 'serverless'
let serverlessRcPath = path.join(os.homedir(), `.${appName}rc`)
if (process.env.SERVERLESS_PLATFORM_STAGE && process.env.SERVERLESS_PLATFORM_STAGE !== 'prod') {
  appName = 'serverlessdev'
  serverlessRcPath = path.join(os.homedir(), `.${appName}rc`)
}

/*
 * Read Config File
 * - The Framework always creates a config file on post-install via the logstat method.  (This isn't optimal and should be changed in the Framework.)
 * - The "rc" package automatically looks in many places (local folder, up a few levels, root dir)
 */

export const readConfigFile = () => {
  return require('rc')(appName) // eslint-disable-line
}

/*
 * Write Config File
 * - Writes a .serverlessrc file on the local machine in the root dir.
 */

export const writeConfigFile = (data) => {
  const configFile = readConfigFile()
  const updatedConfigFile = mergeDeepRight(configFile, data)
  updatedConfigFile.meta.updated_at = Math.round(+new Date() / 1000)

  writeFileAtomic.sync(serverlessRcPath, JSON.stringify(updatedConfigFile, null, 2))

  return updatedConfigFile
}

/*
 * Get Logged In User
 * - Fetches the current logged in user from the .serverlessrc file
 */

export const getLoggedInUser = async () => {
  const config = readConfigFile()
  const user = get(['users', config.userId, 'dashboard'], config)
  if (!user || !user.username || !user.idToken) {
    // user is logged out
    return null
  }
  return pick(['idToken', 'username'], user)
}
