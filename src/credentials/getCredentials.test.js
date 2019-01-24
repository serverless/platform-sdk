import getCredentials from './getCredentials'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({ destinationArn: 'arn:dest' })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getCredentials', () => {
  it('fetches creds from API', async () => {
    process.env.SLS_CLOUD_ACCESS = 'true'
    const result = await getCredentials({
      accessKey: 'accessKey',
      stageName: 'stage',
      command: 'deploy',
      app: 'app',
      service: 'service',
      tenant: 'tenant'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/credentials/keys',
      {
        method: 'POST',
        body: JSON.stringify({
          stageName: 'stage',
          command: 'deploy',
          app: 'app',
          service: 'service'
        }),
        headers: { Authorization: `bearer accessKey` }
      }
    )
    expect(result.destinationArn).toEqual('arn:dest')
  })
})
