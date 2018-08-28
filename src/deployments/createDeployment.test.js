const { createDeployment } = require('./')
const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('createDeployment', () => {
  test('it should make a valid request', async () => {
    if (process.env.CI) {
      delete process.env.CI
    }
    if (process.env.TRAVIS) {
      delete process.env.TRAVIS
    }

    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey'
    }

    await createDeployment(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.serviceName
      }/deployments`,
      {
        method: 'POST',
        body: JSON.stringify({ source: {}, build: {} }),
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.accessKey}`
        }
      }
    )
  })
})

describe('createDeployment - Travis', () => {
  beforeEach(() => {
    process.env.SERVERLESS_ACCESS_KEY = true
    process.env.TRAVIS = true
    process.env.TRAVIS_REPO_SLUG = 'serverless/service'
    process.env.TRAVIS_COMMIT = 'abc'
    process.env.TRAVIS_BUILD_ID = 'xyz'
  })

  afterEach(() => {
    delete process.env.SERVERLESS_ACCESS_KEY
    delete process.env.TRAVIS
    delete process.env.TRAVIS_REPO_SLUG
    delete process.env.TRAVIS_COMMIT
    delete process.env.TRAVIS_BUILD_ID
  })

  test('it should make a valid request in Travis', async () => {
    const source = {
      owner: 'serverless',
      repo: 'service',
      type: 'github',
      sha: 'abc'
    }
    const build = {
      type: 'travis',
      id: 'xyz'
    }

    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey'
    }

    await createDeployment(data)

    expect(fetch).toBeCalledWith(
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
  })
})

describe('createDeployment - CI', () => {
  beforeEach(() => {
    process.env.SERVERLESS_ACCESS_KEY = true
    process.env.CI = 'true'
    process.env.CI_SOURCE_OWNER = 'serverless'
    process.env.CI_SOURCE_REPO = 'service'
    process.env.CI_SOURCE_TYPE = 'bitbucket'
    process.env.CI_COMMIT = 'abc'
    process.env.CI_TYPE = 'someCISystem'
    process.env.CI_BUILD_ID = 'xyz'
  })

  afterEach(() => {
    delete process.env.SERVERLESS_ACCESS_KEY
    delete process.env.CI
    delete process.env.CI_SOURCE_OWNER
    delete process.env.CI_SOURCE_REPO
    delete process.env.CI_SOURCE_TYPE
    delete process.env.CI_COMMIT
    delete process.env.CI_TYPE
    delete process.env.CI_BUILD_ID
  })
  test('it should make a valid request in any CI', async () => {
    const source = {
      owner: 'serverless',
      repo: 'service',
      type: 'bitbucket',
      sha: 'abc'
    }
    const build = {
      type: 'someCISystem',
      id: 'xyz'
    }

    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey'
    }

    await createDeployment(data)

    expect(fetch).toBeCalledWith(
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
  })
})
