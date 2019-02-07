import { createApp } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import { version as currentVersion } from '../../package.json'

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
