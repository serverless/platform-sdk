import { createApp } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

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
      org: 'someorg',
      token: 'sometoken'
    }

    await createApp(data)

    const body = JSON.stringify({
      orgName: data.org,
      appName: data.app,
      title: data.app
    })

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}orgs/${data.org}/applications`, {
      method: 'POST',
      body,
      headers: { Authorization: `bearer ${data.token}` }
    })
  })
})
