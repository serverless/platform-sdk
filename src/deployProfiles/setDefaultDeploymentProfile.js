import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, tenant, deploymentProfile }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/applications/${app}`,
    {
      method: 'PATCH',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({ deploymentProfiles: { default: deploymentProfile } })
    }
  )

  return response.json()
}
