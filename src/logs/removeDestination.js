import fetch from '../fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

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

  await checkHttpResponse(response)

  // This method returns an empty body.
  return
}

export default removeLogDestination
