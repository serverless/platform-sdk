import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

const removeLogDestination = async ({
  tenantUid,
  appUid,
  serviceName,
  stageName,
  regionName,
  accessKey
}) => {
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
      Authorization: `bearer ${accessKey}`
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
