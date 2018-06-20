const fetch = require('isomorphic-fetch')
const platformConfig = require('../config.json')

const archiveService = async (data) => {
  const response = await fetch(`${platformConfig.BACKEND_BASE_URL}/tenants/${data.tenant}/applications/${data.app}/services/${data.name}`, {
    method: 'DELETE',
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

export default archiveService
