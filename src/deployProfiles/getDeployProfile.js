import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, org, stage, service }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}orgs/${org}/applications/${app}/profileValue`,
    {
      method: 'POST',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({
        stageName: stage,
        serviceName: service
      })
    }
  )
  if (response.status === 204) {
    return { secretValues: [], safeguardsPolicies: [], providerCredentials: null }
  }

  return response.json()
}
