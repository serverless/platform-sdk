const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const createDeployment = async (data) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
      data.serviceName
    }/deployments`,
    {
      method: 'POST',
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
  const { id } = await response.json()
  return id
}

export default createDeployment
