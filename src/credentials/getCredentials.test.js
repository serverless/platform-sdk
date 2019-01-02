import getCredentials from './getCredentials'
import fetch from 'isomorphic-fetch'
import { getUser } from '../rcfile'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({ destinationArn: 'arn:dest' })
  })
)
jest.mock('../rcfile', () => ({
  getUser: jest.fn().mockReturnValue({ idToken: 'userIdToken' })
}))

afterAll(() => jest.restoreAllMocks())

describe('getCredentials', () => {
  it('fetches creds from API', async () => {
    process.env.SLS_CLOUD_ACCESS = 'true'
    const getStage = jest.fn().mockReturnValue('stage')
    const getServiceName = jest.fn().mockReturnValue('service')
    const result = await getCredentials({
      provider: {
        getStage
      },
      sls: {
        processedInput: { commands: ['deploy'] },
        service: {
          app: 'app',
          tenant: 'tenant',
          getServiceName
        }
      }
    })
    expect(getUser).toHaveBeenCalledTimes(1)
    expect(fetch).toBeCalledWith(
      'https://jnvhp1any0.execute-api.us-east-1.amazonaws.com/prod/tenants/tenant/credentials/keys',
      {
        method: 'POST',
        body: JSON.stringify({
          stageName: 'stage',
          command: 'deploy',
          app: 'app',
          service: 'service'
        }),
        headers: { Authorization: `bearer userIdToken` }
      }
    )
    expect(result.destinationArn).toEqual('arn:dest')
  })
})
