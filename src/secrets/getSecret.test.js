import getSecret from './getSecret'
import fetch from 'node-fetch'
jest.mock('node-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({ destinationArn: 'arn:dest' })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getSecret', () => {
  it('fetches secret from API', async () => {
    const result = await getSecret({
      secretName: 'secretname',
      accessKey: 'accessKey',
      app: 'app',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage'
    })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants/tenant/secrets/access', {
      method: 'POST',
      body: JSON.stringify({
        secretName: 'secretname',
        appName: 'app',
        serviceName: 'service',
        stageName: 'stage'
      }),
      headers: { Authorization: `bearer accessKey` }
    })
    expect(result.destinationArn).toEqual('arn:dest')
  })
})
