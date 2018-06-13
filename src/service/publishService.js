const fetch = require('isomorphic-fetch')
const platformConfig = require('../config.json')

const publishService = async (data) => {
  const response = await fetch(`${platformConfig.url}/tenants/${data.tenant}/applications/${data.app}/services`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.accessKey}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response
}

export default publishService
