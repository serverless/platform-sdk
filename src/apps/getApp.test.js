import { getApp } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'
import refreshToken from '../login/refreshToken'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

jest.mock('../utils', () => ({
  getLoggedInUser: jest.fn().mockReturnValue({
    accessKeys: {
      someorg: 'userAccessKey'
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
      org: 'someorg'
    }

    await getApp(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}orgs/${data.org}/applications/${data.app}`,
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
      org: 'someorg',
      token: 'mytoken'
    }

    await getApp(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}orgs/${data.org}/applications/${data.app}`,
      {
        method: 'GET',
        headers: { Authorization: `bearer mytoken` }
      }
    )
    expect(refreshToken).toBeCalledWith()
  })
})
