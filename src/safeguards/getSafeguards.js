import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { checkHttpResponse } from '../utils'

export default async ({ accessKey, app, tenant }) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/safeguards/rules?appName=${app}`,
    { method: 'GET', headers: { Authorization: `bearer ${accessKey}` } }
  )

  await checkHttpResponse(response, 'Could not retrieve secret')

  return response.json()
}
