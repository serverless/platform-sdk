import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import utils from '../utils'

const removeLogDestination = async ({
  tenantUid,
  appUid,
  serviceName,
  stageName,
  regionName,
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
    regionName
  })

  const response = await fetch(`${platformConfig.logDestinationUrl}destinations/delete`, {
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
  // This method returns an empty body.
  return
}

export default removeLogDestination
