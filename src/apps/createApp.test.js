import { createApp } from './'
import fetch from 'cross-fetch'
import platformConfig from '../config'

jest.mock('cross-fetch', () =>
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
        headers: { Authorization: `bearer ${data.token}` }
      }
    )
  })
})
