import { getApp } from './'
import fetch from 'node-fetch'
import platformConfig from '../config'
import refreshToken from '../login/refreshToken'

jest.mock('node-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

jest.mock('../utils', () => ({
  getLoggedInUser: jest.fn().mockReturnValue({
    accessKeys: {
      sometenant: 'userAccessKey'
    }
  }),
  checkHttpResponse: jest.fn()
}))

jest.mock('../login/refreshToken', () => jest.fn().mockReturnValue())

afterAll(() => jest.restoreAllMocks())

describe('getApp', () => {
  test('it should make a valid request without a provided token', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant'
    }

    await getApp(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`,
      {
        method: 'GET',
        headers: { Authorization: `bearer userAccessKey` }
      }
    )
    expect(refreshToken).toBeCalledWith()
  })

  test('it should make a valid request with a provided token', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      token: 'mytoken'
    }

    await getApp(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}`,
      {
        method: 'GET',
        headers: { Authorization: `bearer mytoken` }
      }
    )
    expect(refreshToken).toBeCalledWith()
  })
})
