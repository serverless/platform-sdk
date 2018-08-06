const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../../package.json').version

const updateDeployment = async (data) => {
  const body = {
    deployment: {
      status: data.status
    }
  }
  if (data.state && data.state.service && data.state.service.name) {
    body.state = data.state
  }
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
      data.serviceName
    }/deployments/${data.deploymentId}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
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

export default updateDeployment
