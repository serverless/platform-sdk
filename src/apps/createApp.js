import fetch from '../fetch'
import platformConfig from '../config'

const slugifyApp = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace any run of disallowed chars with a hyphen
    .replace(/^-+/, '') // remove leading hyphens
    .replace(/-+$/, '') // remove trailing hyphens

const createApp = async (data) => {
  const body = JSON.stringify({
    orgName: data.org,
    appName: slugifyApp(data.app),
    title: data.app
  })
  const response = await fetch(`${platformConfig.backendUrl}orgs/${data.org}/applications`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${data.token}`
    }
  })

  return response.json()
}

export default createApp
