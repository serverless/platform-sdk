import fetch from 'isomorphic-fetch'
import getLogDestinationUrl from './destinationUrl'

const removeLogDestination = async ({
  tenantName,
  appName,
  serviceName,
  stageName,
  regionName
}) => {
  const body = JSON.stringify({
    tenantName,
    appName,
    serviceName,
    stageName,
    regionName
  })

  const response = await fetch(`${getLogDestinationUrl()}/destinations/delete`, {
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

export default removeLogDestination
