const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const refreshToken = async (userRefreshToken) => {
  const body = JSON.stringify({
    refreshToken: userRefreshToken
  })
  const response = await fetch(`${platformConfig.backendUrl}tokens/refresh`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

module.exports = refreshToken
