import fetch from '../fetch'
import platformConfig from '../config'

const getTokens = async (code) => {
  const body = JSON.stringify({
    code,
    redirect_uri: `${platformConfig.frontendUrl}callback`
  })
  const response = await fetch(`${platformConfig.backendUrl}tokens`, { method: 'POST', body })

  return response.json()
}

module.exports = getTokens
