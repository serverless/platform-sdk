import fetch from '../fetch'
import platformConfig from '../config'

const register = async (email, password, username, tenantName, tenantTitle) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants`, {
    method: 'POST',
    body: JSON.stringify({
      tenantName,
      title: tenantTitle,
      ownerUserName: username,
      ownerPassword: password,
      ownerEmail: email
    })
  })

  return response.json()
}

module.exports = register
