import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

const removeLogDestination = async ({ appUid, serviceName, stageName, regionName }) => {
  const body = JSON.stringify({
    appUid,
    serviceName,
    stageName,
    regionName
  })

  const response = await fetch(`${platformConfig.logDestinationUrl}destinations/delete`, {
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
  // This method returns an empty body.
  return
}

export default removeLogDestination
