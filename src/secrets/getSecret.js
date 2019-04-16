import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ secretName, accessKey, app, service, tenant, stage }) => {
  const body = JSON.stringify({
    secretName,
    appName: app,
    serviceName: service,
    stageName: stage
  })

  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/secrets/access`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${accessKey}`
    }
  })

  return response.json()
}
