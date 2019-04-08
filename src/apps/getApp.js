import fetch from '../fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'
import { getAccessKeyForTenant } from '../accessKeys'
import { checkHttpResponse } from '../utils'

const getApp = async (data) => {
  let { token } = data

  if (!token) {
    token = await getAccessKeyForTenant(data.tenant)
  }

  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${token}`
      }
    }
  )

  await checkHttpResponse(response)

  return response.json()
}

export default getApp
