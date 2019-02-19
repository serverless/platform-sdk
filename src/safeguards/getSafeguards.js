import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

export default async ({ accessKey, app, service, tenant, stage }) => {
  const body = JSON.stringify({
    appName: app,
    serviceName: service,
    stageName: stage
  })

  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/safeguards`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${accessKey}`
    }
  })

  await checkHttpResponse(response, 'Could not retrieve secret')

  return response.json()
}
