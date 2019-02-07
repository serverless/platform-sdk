import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'
import { checkHttpResponse } from '../utils'

const updateDeployment = async (data) => {
  const body = {
    status: data.status,
    computedData: data.computedData
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

  await checkHttpResponse(response)

  return response.json()
}

export default updateDeployment
