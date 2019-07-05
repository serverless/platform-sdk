import fetch from '../fetch'
import platformConfig from '../config'

const listOrgs = async (data) => {
  const response = await fetch(`${platformConfig.backendUrl}orgs?userName=${data.username}`, {
    method: 'GET',
    headers: { Authorization: `bearer ${data.idToken}` }
  })

  return response.json()
}

export default listOrgs
