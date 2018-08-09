const { getApp } = require('./')
const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getApp', () => {
  test('it should make a valid request', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      token: 'sometoken'
    }

    await getApp(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.token}`
        }
      }
    )
  })
})
