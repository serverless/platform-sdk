import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, tenant, stage, service }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/applications/${app}/profileValue`,
    {
      method: 'POST',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({ stage, service })
    }
  )
  if (response.status === 204) {
    return { secretValues: [], safeguardPolicies: [], providerCredentials: null }
  }

  return response.json()
}
