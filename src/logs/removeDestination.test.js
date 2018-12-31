import fetch from 'isomorphic-fetch'
import { removeLogDestination } from './'
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

describe('removeLogDestination', () => {
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
        request: jest.fn()
      }
    }
    await removeLogDestination(ctx)
    expect(ctx.provider.request).toHaveBeenCalledTimes(0)
    expect(ctx.provider.getStage).toBeCalledWith()
    expect(ctx.provider.getRegion).toBeCalledWith()
    expect(fetch).toBeCalledWith(`${getLogDestinationUrl()}/destinations/delete`, {
      method: 'POST',
      body: JSON.stringify({
        tenantName: 'tenant',
        appName: 'app',
        serviceName: 'serviceName',
        stageName: 'stage',
        regionName: 'region'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
})
