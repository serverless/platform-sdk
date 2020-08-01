import fetch from 'cross-fetch'
import platformConfig from '../config'
import { removeLogDestination } from './'

jest.mock('cross-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: async () => ({})
    })
  )
)

jest.mock('../utils', () => ({
  getLoggedInUser: jest.fn().mockReturnValue({ idToken: 'userIdToken' }),
  checkHttpResponse: jest.fn()
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
      accountId: 'ACCOUNT_ID',
      accessKey: 'accessKey'
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
        Authorization: 'bearer accessKey',
        'Content-Type': 'application/json'
      }
    })
  })
})
