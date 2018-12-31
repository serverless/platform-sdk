import fetch from 'isomorphic-fetch'
import { getLogDestination } from './'
import getLogDestinationUrl from './destinationUrl'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: async () => ({})
    })
  )
)

afterAll(() => jest.restoreAllMocks())

describe('getLogDestination', () => {
  test('it creates the log destination URL', async () => {
    const ctx = {
      sls: {
        service: {
          tenant: 'tenant',
          app: 'app',
          getServiceName: jest.fn().mockReturnValue('serviceName')
        }
      },
      provider: {
        getStage: jest.fn().mockReturnValue('stage'),
        getRegion: jest.fn().mockReturnValue('region'),
        request: jest.fn().mockReturnValue({ Account: 'ACCOUNT_ID' })
      }
    }
    await getLogDestination(ctx)
    expect(ctx.provider.request).toBeCalledWith('STS', 'getCallerIdentity', {})
    expect(ctx.provider.getStage).toBeCalledWith()
    expect(ctx.provider.getRegion).toBeCalledWith()
    expect(fetch).toBeCalledWith(`${getLogDestinationUrl()}/destinations/create`, {
      method: 'POST',
      body: JSON.stringify({
        tenantName: 'tenant',
        appName: 'app',
        serviceName: 'serviceName',
        stageName: 'stage',
        regionName: 'region',
        accountId: 'ACCOUNT_ID'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})
