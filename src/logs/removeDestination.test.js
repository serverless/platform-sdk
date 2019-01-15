import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { removeLogDestination } from './'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: async () => ({})
    })
  )
)

jest.mock('../rcfile', () => ({
  getUser: jest.fn().mockReturnValue({ idToken: 'userIdToken' })
}))

afterAll(() => jest.restoreAllMocks())

describe('removeLogDestination', () => {
  test('it creates the log destination URL', async () => {
    const opts = {
      tenantUid: 'tenant123',
      appUid: 'app123',
      serviceName: 'serviceName',
      regionName: 'region',
      stageName: 'stage',
      accountId: 'ACCOUNT_ID'
    }

    await removeLogDestination(opts)
    expect(fetch).toBeCalledWith(`${platformConfig.logDestinationUrl}destinations/delete`, {
      method: 'POST',
      body: JSON.stringify({
        tenantUid: 'tenant123',
        appUid: 'app123',
        serviceName: 'serviceName',
        stageName: 'stage',
        regionName: 'region'
      }),
      headers: {
        Authorization: 'bearer userIdToken',
        'Content-Type': 'application/json'
      }
    })
  })
})
