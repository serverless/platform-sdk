import fetch from '../fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

export default async ({ accessKey, app, tenant }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/safeguards/policies/?appName=${app}`,
    { method: 'GET', headers: { Authorization: `bearer ${accessKey}` } }
  )

  await checkHttpResponse(response, 'Could not retrieve safeguards')

  return response.json()
}
