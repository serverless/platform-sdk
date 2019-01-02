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
    const opts = {
      tenantName: 'tenant',
      appName: 'app',
      serviceName: 'serviceName',
      regionName: 'region',
      stageName: 'stage',
      accountId: 'ACCOUNT_ID'
    }

    await removeLogDestination(opts)
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
