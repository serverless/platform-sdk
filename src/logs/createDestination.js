import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

const createDestination = async ({
  tenantUid,
  appUid,
  serviceName,
  stageName,
  regionName,
  accountId,
  accessKey
}) => {
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
      Authorization: `bearer ${accessKey}`
    }
  })

  await checkHttpResponse(response)

  return response.json()
}

export default createDestination
