import { createDeployment } from './'
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

describe('createDeployment', () => {
  test('it should make a valid request', async () => {
    const data = {
      tenant: 'sometenant',
      app: 'someapp',
      serviceName: 'someservicename',
      accessKey: 'someaccesskey',
      files: {
        some: 'file'
      }
    }

    await createDeployment(data)

    const body = {
      files: data.files
    }

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.serviceName
      }/deployments`,
      {
        method: 'POST',
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
