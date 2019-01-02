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
    const opts = {
      tenantName: 'tenant',
      appName: 'app',
      serviceName: 'serviceName',
      regionName: 'region',
      stageName: 'stage',
      accountId: 'ACCOUNT_ID'
    }

    await getLogDestination(opts)
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
