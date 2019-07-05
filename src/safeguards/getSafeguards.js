import fetch from '../fetch'
import platformConfig from '../config'

export default async ({ accessKey, app, org }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}orgs/${org}/safeguards/policies/?appName=${app}`,
    { method: 'GET', headers: { Authorization: `bearer ${accessKey}` } }
  )

  return response.json()
}
