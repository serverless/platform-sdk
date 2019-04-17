import { archiveService } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('archiveService', () => {
  test('it should make a valid request', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      name: 'somename',
      accessKey: 'someaccesskey',
      provider: 'aws',
      region: 'us-east-1'
    }

    await archiveService(data)

    const body = {
      provider: data.provider,
      region: data.region
    }

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.name
      }`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { Authorization: `bearer ${data.accessKey}` }
      }
    )
  })
})
