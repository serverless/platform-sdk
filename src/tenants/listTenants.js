import fetch from '../fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'
import { checkHttpResponse } from '../utils'

const listTenants = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants?userName=${data.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-platform-version': currentVersion,
      Authorization: `bearer ${data.idToken}`
    }
  })

  await checkHttpResponse(response)

  return response.json()
}

export default listTenants
