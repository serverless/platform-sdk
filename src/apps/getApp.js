import fetch from '../fetch'
import platformConfig from '../config'
import { getAccessKeyForOrg } from '../accessKeys'

const getApp = async (data) => {
  let { token } = data

  if (!token) {
    token = await getAccessKeyForOrg(data.org)
  }

  const response = await fetch(
    `${platformConfig.backendUrl}orgs/${data.org}/applications/${data.app}`,
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${token}`
      }
    }
  )

  return response.json()
}

export default getApp
