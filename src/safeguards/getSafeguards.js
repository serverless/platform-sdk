import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, tenant }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/safeguards/policies/?appName=${app}`,
    { method: 'GET', headers: { Authorization: `bearer ${accessKey}` } }
  )

  return response.json()
}
