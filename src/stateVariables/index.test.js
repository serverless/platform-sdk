import { getStateVariable } from './index'
import fetch from 'cross-fetch'
jest.mock('cross-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    status: 200,
    json: async () => ({ value: 'bar' })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getStateVariable', () => {
  it('fetches deployment profile from API', async () => {
    const result = await getStateVariable({
      accessKey: 'accessKey',
      outputName: 'foobar',
      app: 'app-with-profile',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage',
      region: 'region'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/applications/app-with-profile/services/service/stages/stage/regions/region/outputs',
      {
        method: 'POST',
        headers: { Authorization: `bearer accessKey` },
        body: JSON.stringify({ outputName: 'foobar' })
      }
    )
    expect(result).toEqual({ value: 'bar' })
  })
})
