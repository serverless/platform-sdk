import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import utils from '../utils'

const createDestination = async ({
  tenantUid,
  appUid,
  serviceName,
  stageName,
  regionName,
  accountId,
  token
}) => {
  if (!token) {
    const user = utils.getLoggedInUser()
    if (!user) {
      return Promise.reject('User is not logged in to the Platform.')
    }
    token = user.idToken
  }

  const body = JSON.stringify({
    tenantUid,
    appUid,
    serviceName,
    stageName,
    regionName,
    accountId
  })

  const response = await fetch(`${platformConfig.logDestinationUrl}destinations/create`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default createDestination
