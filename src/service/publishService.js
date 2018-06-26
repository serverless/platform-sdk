const fetch = require('isomorphic-fetch')
const platformConfig = require('../config.json')

const publishService = async (data) => {
  const response = await fetch(`${platformConfig.BACKEND_BASE_URL}tenants/${data.tenant}/applications/${data.app}/services`, {
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
  const serviceUrl = `${platformConfig.FRONTEND_BASE_URL}tenants/${data.tenant}/applications/${data.app}/services/${data.service.name}`
  return serviceUrl
}

export default publishService
