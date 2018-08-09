const { listTenants } = require('./')
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

describe('listTenants', () => {
  test('it should make a valid request', async () => {
    const data = {
      username: 'someusername',
      idToken: 'someIdToken'
    }

    await listTenants(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}tenants?userName=${data.username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${data.idToken}`
      }
    })
  })
})
