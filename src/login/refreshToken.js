const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const refreshToken = async (userRefreshToken) => {
  const body = JSON.stringify({
    refreshToken: userRefreshToken
  })
  const response = await fetch(`https://ua4s71ruc7.execute-api.us-east-1.amazonaws.com/dev/tokens/refresh`, {
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
