import refreshToken from './refreshToken'
import fetch from 'isomorphic-fetch'
import utils from '../utils'
import { version as currentVersion } from '../../package.json'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: jest.fn().mockReturnValue(
        Promise.resolve({
          id_token: 'id_token',
          access_token: 'access_token',
          expires_in: 'expires_in'
        })
      )
    })
  )
)

jest.mock('../utils', () => ({
  readConfigFile: jest.fn().mockReturnValue({
    userId: 'userId',
    users: {
      userId: {
        dashboard: {
          expiresAt: 10 * 1000 + new Date().getTime(),
          refreshToken: 'refreshToken'
        }
      }
    }
  }),
  writeConfigFile: jest.fn().mockReturnValue()
}))

describe('refreshToken', () => {
  it('refreshes tokens', async () => {
    await refreshToken()
    expect(utils.readConfigFile).toBeCalledWith()
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tokens/refresh', {
      body: JSON.stringify({ refreshToken: 'refreshToken' }),
      headers: { 'Content-Type': 'application/json', 'x-platform-version': currentVersion },
      method: 'POST'
    })
    expect(utils.writeConfigFile).toBeCalledWith({
      userId: 'userId',
      users: {
        userId: {
          dashboard: {
            accessToken: 'access_token',
            expiresAt: NaN,
            idToken: 'id_token',
            refreshToken: 'refreshToken'
          }
        }
      }
    })
  })
})
