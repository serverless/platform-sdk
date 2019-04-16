import fetch from '../fetch'
import platformConfig from '../config'

const listTenants = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}tenants?userName=${data.username}`, {
    method: 'GET',
    headers: { Authorization: `bearer ${data.idToken}` }
  })

  return response.json()
}

export default listTenants
