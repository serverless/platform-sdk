import fetch from '../fetch'
import platformConfig from '../config'
import { getAccessKeyForTenant } from '../accessKeys'

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
        Authorization: `bearer ${token}`
      }
    }
  )

  return response.json()
}

export default getApp
