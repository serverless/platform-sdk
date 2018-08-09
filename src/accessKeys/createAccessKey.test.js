const { createAccessKey } = require('./')
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

describe('createAccessKey', () => {
  test('it should make a valid request', async () => {
    const data = {
      tenant: 'sometenant',
      username: 'someusername',
      title: 'sometitle',
      idToken: 'someidtoken'
    }

    await createAccessKey(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}tenants/${data.tenant}/accessKeys`, {
      method: 'POST',
      body: JSON.stringify({
        tenantName: data.tenant,
        userName: data.username,
        title: data.title
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-platform-version': currentVersion,
        Authorization: `bearer ${data.idToken}`
      }
    })
  })
})
