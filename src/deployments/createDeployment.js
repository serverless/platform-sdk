const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

const createDeployment = async (data) => {
  const source = {}
  const build = {}

  if (process.env.SERVERLESS_ACCESS_KEY && process.env.TRAVIS) {
    const [owner, repo] = process.env.TRAVIS_REPO_SLUG.split('/')
    source.owner = owner
    source.repo = repo
    source.type = 'github'
    source.sha = process.env.TRAVIS_COMMIT
    build.type = 'travis'
    build.id = process.env.TRAVIS_BUILD_ID
  } else if (process.env.SERVERLESS_ACCESS_KEY && process.env.CI) {
    source.owner = process.env.CI_SOURCE_OWNER
    source.repo = process.env.CI_SOURCE_REPO
    source.type = process.env.CI_SOURCE_TYPE
    source.sha = process.env.CI_COMMIT
    build.type = process.env.CI_TYPE
    build.id = process.env.CI_BUILD_ID
  }

  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
      data.serviceName
    }/deployments`,
    {
      method: 'POST',
      body: JSON.stringify({ source, build }),
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

export default createDeployment
