const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../../package.json').version

const archiveService = async (data) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
      data.name
    }`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${data.accessKey}`
      }
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default archiveService
