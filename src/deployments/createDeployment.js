/*
 * Create Deployment
 * - Creates a deployment record on the Serverless Enterprise Platform
 */

import fetch from 'isomorphic-fetch'
import { version as currentVersion } from '../../package.json'
import platformConfig from '../config'

const createDeployment = async (data) => {
  const body = {
    files: data.files
  }

  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${data.serviceName}/deployments`, // eslint-disable-line
    {
      method: 'POST',
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

export default createDeployment
