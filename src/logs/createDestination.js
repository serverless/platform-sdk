import fetch from 'isomorphic-fetch'
import getLogDestinationUrl from './destinationUrl'

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

  const response = await fetch(`${getLogDestinationUrl()}/destinations/create`, {
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
