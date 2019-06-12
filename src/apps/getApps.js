import fetch from '../fetch'
import platformConfig from '../config'
import { getAccessKeyForTenant } from '../accessKeys'

const getApps = async (data) => {
  const token = data.token || (await getAccessKeyForTenant(data.tenant))

  const response = await fetch(`${platformConfig.backendUrl}tenants/${data.tenant}/applications`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`
    }
  })

  return response.json()
}

export default getApps
