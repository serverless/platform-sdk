const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

const createAccessKey = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants/${data.tenant}/accessKeys`, {
    method: 'POST',
    body: JSON.stringify({
      tenantName: data.tenant,
      userName: data.username,
      title: data.title
    }),
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

export default createAccessKey
