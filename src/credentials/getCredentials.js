import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

export default async ({ accessKey, stageName, command, app, service, tenant }) => {
  const body = JSON.stringify({ stageName, command, app, service })

  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/credentials/keys`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${accessKey}`
    }
  })

  await checkHttpResponse(response, 'Could not retrieve credentials')

  return response.json()
}
