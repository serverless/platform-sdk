const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

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
      Authorization: `bearer ${data.idToken}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }

  const { secretAccessKey } = await response.json()
  return secretAccessKey
}

export default createAccessKey
