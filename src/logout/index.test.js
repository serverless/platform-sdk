import { version as currentSdkVersion } from '../../package.json'
import { logout } from './'
import utils from '../utils'

jest.mock('../utils', () => ({
  readConfigFile: jest.fn().mockReturnValue({
    users: {
      user: {
        dashboard: {
          accessToken: 'asdf',
          idToken: 'safsfsfd',
          expiresAt: 5434
        }
      }
    },
    userId: 'user'
  }),
  writeConfigFile: jest.fn().mockReturnValue('NEWCONFIG')
}))

describe('logout', () => {
  it('calls write config file with out user in it', async () => {
    const config = await logout()
    expect(config).toEqual('NEWCONFIG')
    expect(utils.readConfigFile).toBeCalledWith()
    expect(utils.writeConfigFile).toBeCalledWith({
      users: {
        user: {
          enterprise: {
            timeLastLogout: Math.round(+new Date() / 1000),
            versionSDK: currentSdkVersion
          },
          dashboard: {
            accessToken: null,
            idToken: null,
            expiresAt: null
          }
        }
      },
      userId: null
    })
  })
})
