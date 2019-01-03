import fs from 'fs'
import os from 'os'
import path from 'path'
import { path as get, pick } from 'ramda'

const serverlessrcPath = path.join(os.homedir(), '.serverlessrc')

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