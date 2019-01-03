const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version
const { getUser } = require('../rcfile')

const getApp = async (data) => {
  const user = getUser()
  if (!user) {
    return Promise.reject('User is not logged in to the Platform.')
  }
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${user.idToken}`
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default getApp
