const { createApp } = require('./')
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

describe('createApp', () => {
  test('it should make a valid request', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      token: 'sometoken'
    }

    await createApp(data)

    const body = JSON.stringify({
      tenantName: data.tenant,
      appName: data.app,
      title: data.app
    })

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications`,
      {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.token}`
        }
      }
    )
  })
})
