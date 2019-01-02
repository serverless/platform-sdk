import fetch from 'isomorphic-fetch'
const platformConfig = require('../config')
import { getUser } from '../rcfile'

export default async (ctx) => {
  if (!process.env.SLS_CLOUD_ACCESS) {
    return Promise.resolve()
  }
  const user = getUser()
  if (!user) {
    ctx.serverless.cli.log('User not logged in to Platform. Skipping fetch credentials.')
    return Promise.resolve()
  }
  const body = JSON.stringify({
    stageName: ctx.provider.getStage(),
    command: ctx.sls.processedInput.commands[0],
    app: ctx.sls.service.app,
    service: ctx.sls.service.getServiceName()
  })

  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${ctx.sls.service.tenant}/credentials/keys`,
    {
      method: 'POST',
      body,
      headers: {
        Authorization: `bearer ${user.idToken}`
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(` Could not retrieve credentials from Serverless Platform: ${text}`)
  }

  return response.json()
}
