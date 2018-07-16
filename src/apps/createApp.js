const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')

const slugifyApp = (text) => text.toString().toLowerCase()
  .replace(/[^a-z0-9]+/g, '-') // Replace any run of disallowed chars with a hyphen
  .replace(/^-+/, '') // remove leading hyphens
  .replace(/-+$/, '') // remove trailing hyphens

const createApp = async (data) => {
  const body = JSON.stringify({
    tenantName: data.tenant,
    appName: slugifyApp(data.app),
    title: data.app
  })
  const response = await fetch(`${platformConfig.backendUrl}tenants/${data.tenant}/applications`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${data.token}`
    }
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text)
  }
  return response.json()
}

export default createApp
