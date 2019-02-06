import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'
import { checkHttpResponse } from '../utils'

const getTokens = async (code) => {
  const body = JSON.stringify({
    code,
    redirect_uri: `${platformConfig.frontendUrl}callback`
  })
  const response = await fetch(`${platformConfig.backendUrl}tokens`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'x-platform-version': currentVersion
    }
  })

  await checkHttpResponse(response)

  return response.json()
}

module.exports = getTokens
