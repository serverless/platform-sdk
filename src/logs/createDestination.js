import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

const createDestination = async ({
  tenantName,
  appName,
  serviceName,
  stageName,
  regionName,
  accountId
}) => {
  const body = JSON.stringify({
    tenantName,
    appName,
    serviceName,
    stageName,
    regionName,
    accountId
  })

  const response = await fetch(`${platformConfig.logDestinationUrl}destinations/create`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default createDestination
