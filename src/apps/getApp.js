const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const getApp = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.token}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default getApp
