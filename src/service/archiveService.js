const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const archiveService = async (data) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
      data.name
    }`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${data.accessKey}`
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default archiveService
