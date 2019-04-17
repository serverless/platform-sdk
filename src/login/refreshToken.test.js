import refreshToken from './refreshToken'
import fetch from 'isomorphic-fetch'
import * as utils from '../utils'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: jest.fn().mockReturnValue(
        Promise.resolve({
          id_token: 'id_token',
          access_token: 'access_token',
          expires_in: 10000
        })
      )
    })
  )
)

Date.now = jest.fn().mockReturnValue(1548263344735)

jest.mock('../utils', () => ({
  readConfigFile: jest.fn().mockReturnValue({
    userId: 'userId',
    users: {
      userId: {
        dashboard: {
          expiresAt: 1548263344735 - 10000,
          refreshToken: 'refreshToken'
        }
      }
    }
  }),
  writeConfigFile: jest.fn().mockReturnValue(),
  checkHttpResponse: jest.fn()
}))

describe('refreshToken', () => {
  it('refreshes tokens', async () => {
    await refreshToken()
    expect(utils.readConfigFile).toBeCalledWith()
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tokens/refresh', {
      body: JSON.stringify({ refreshToken: 'refreshToken' }),
      headers: {},
      method: 'POST'
    })
    expect(utils.writeConfigFile).toBeCalledWith({
      userId: 'userId',
      users: {
        userId: {
          dashboard: {
            accessToken: 'access_token',
            expiresAt: 1548273344735,
            idToken: 'id_token',
            refreshToken: 'refreshToken'
          }
        }
      }
    })
  })
})
