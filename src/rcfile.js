import fs from 'fs'
import os from 'os'
import path from 'path'
import { path as get, pick } from 'ramda'

let serverlessrcPath = path.join(os.homedir(), '.serverlessrc')
if (process.env.SERVERLESS_PLATFORM_STAGE && process.env.SERVERLESS_PLATFORM_STAGE !== 'prod') {
  serverlessrcPath = path.join(os.homedir(), '.serverlessdevrc')
}

export const hasConfigFile = () => fs.existsSync(serverlessrcPath)

export const getConfig = () =>
  hasConfigFile() ? JSON.parse(fs.readFileSync(serverlessrcPath)) : null

export const getUser = () => {
  const config = getConfig()
  const user = get(['users', config.userId, 'dashboard'], config)
  if (!user || !user.username || !user.idToken) {
    // user is logged out
    return null
  }
  return pick(['idToken', 'username'], user)
}
