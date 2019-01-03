import fetch from 'isomorphic-fetch'
const platformConfig = require('../config')

export default async ({ user, stageName, command, app, service, tenant }) => {
  const body = JSON.stringify({ stageName, command, app, service })

  const response = await fetch(`${platformConfig.backendUrl}tenants/${tenant}/credentials/keys`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${user.idToken}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(` Could not retrieve credentials from Serverless Platform: ${text}`)
  }

  return response.json()
}
