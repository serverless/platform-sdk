import fetch from '../fetch'
import platformConfig from '../config'
import * as utils from '../utils'
import refreshToken from '../login/refreshToken'

/*
 * Create Access Key For Org
 */

const createAccessKeyForOrg = async (org, title) => {
  await refreshToken()

  const user = utils.getLoggedInUser()

  const response = await fetch(`${platformConfig.backendUrl}orgs/${org}/accessKeys`, {
    method: 'POST',
    body: JSON.stringify({
      orgName: org,
      userName: user.username,
      title: title || 'serverless_' + Math.round(+new Date() / 1000)
    }),
    headers: {
      Authorization: `bearer ${user.idToken}`
    }
  })

  const data = await response.json()
  return data.secretAccessKey
}

/*
 * Get Access Key For Org
 * - Fetches the access key for the specified `org`
 * - If an access key is present as an env var, that overrides all else
 */

const getAccessKeyForOrg = async (org) => {
  // Check if in ENV, return that first...
  if (process.env.SERVERLESS_ACCESS_KEY) {
    return process.env.SERVERLESS_ACCESS_KEY
  }

  if (!org) {
    throw new Error('SDK: getAccessKeyForOrg() requires a "org".')
  }

  await refreshToken()

  const user = utils.getLoggedInUser()

  // Check if in config file, return that next...
  if (!user.accessKeys || !user.accessKeys[org]) {
    throw new Error(`Could not find an access key for org ${org}.  Log out and log in again to create a new access key for this org.`) // eslint-disable-line
  }

  return user.accessKeys[org]
}

export { createAccessKeyForOrg, getAccessKeyForOrg }
