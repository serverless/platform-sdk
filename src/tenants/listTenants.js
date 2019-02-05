import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'

const listTenants = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants?userName=${data.username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-platform-version': currentVersion,
      Authorization: `bearer ${data.idToken}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }

  return response.json()
}

export default listTenants
