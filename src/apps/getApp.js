import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'
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
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default getApp
