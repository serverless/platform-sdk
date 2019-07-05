import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ secretName, accessKey, app, service, org, stage }) => {
  const body = JSON.stringify({
    secretName,
    appName: app,
    serviceName: service,
    stageName: stage
  })

  const response = await fetch(`${platformConfig.backendUrl}orgs/${org}/secrets/access`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${accessKey}`
    }
  })

  return response.json()
}
