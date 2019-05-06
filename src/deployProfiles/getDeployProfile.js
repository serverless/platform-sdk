import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, tenant, stage, service }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/applicaitons/${app}/profileValue`,
    {
      method: 'POST',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({
        stageName: stage,
        serviceName: service
      })
    }
  )

  return response.json()
}
