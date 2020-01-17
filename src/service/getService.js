import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, tenant, service }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/applications/${app}/services/${service}`,
    {
      method: 'GET',
      headers: { Authorization: `bearer ${accessKey}` }
    }
  )

  return response.json()
}
