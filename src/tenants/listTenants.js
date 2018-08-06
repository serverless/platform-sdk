const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

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
