const { updateDeployment } = require('./')
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

describe('updateDeployment', () => {
  test('it should make a valid DEPLOYMENT FAILED request', async () => {
    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey',
      deploymentId: 'somedeploymentId',
      status: 'failed'
    }

    await updateDeployment(data)

    const body = {
      deployment: {
        status: data.status
      }
    }

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.serviceName
      }/deployments/${data.deploymentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.accessKey}`
        }
      }
    )
  })

  test('it should make a valid DEPLOYMENT SUCCEEDED request', async () => {
    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey',
      deploymentId: 'somedeploymentId',
      status: 'failed',
      state: {
        service: {
          name: 'someservicename'
        }
      }
    }

    await updateDeployment(data)

    const body = {
      deployment: {
        status: data.status
      },
      state: data.state
    }

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.serviceName
      }/deployments/${data.deploymentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.accessKey}`
        }
      }
    )
  })
})
