import fetch from '../fetch'
import platformConfig from '../config'

const register = async (email, password) => {
  const response = await fetch(`${platformConfig.backendUrl}register`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

  return response.json()
}

module.exports = register
