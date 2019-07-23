import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, tenant }) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/deploymentProfiles`, {
    headers: { Authorization: `bearer ${accessKey}` }
  })

  return response.json()
}
