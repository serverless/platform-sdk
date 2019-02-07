import { updateDeployment } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'

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
      status: 'failed',
      computedData: {
        readme: '# README'
      }
    }

    await updateDeployment(data)

    const body = {
      status: data.status,
      computedData: data.computedData
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
      status: 'success',
      computedData: {
        readme: '# README'
      }
    }

    await updateDeployment(data)

    const body = {
      status: data.status,
      computedData: data.computedData
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
