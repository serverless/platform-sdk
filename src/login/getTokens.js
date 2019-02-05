import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'

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

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

module.exports = getTokens
