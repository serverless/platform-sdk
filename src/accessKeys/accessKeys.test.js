import { getAccessKeyForOrg, createAccessKeyForOrg } from './accessKeys'

jest.mock('../fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: jest.fn().mockReturnValue(
        Promise.resolve({
          id_token: 'id_token',
          access_token: 'access_token',
          secretAccessKey: 'secret_access_key',
          expires_in: 10000
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
          expiresAt: 1548263344735 - 10000,
          refreshToken: 'refreshToken'
        }
      }
    }
  }),
  writeConfigFile: jest.fn().mockReturnValue(),
  checkHttpResponse: jest.fn(),
  getLoggedInUser: jest.fn().mockReturnValue({
    accessKeys: { foo: 'serverless_access_key' },
    idToken: 'id_token'
  })
}))

describe('getAccessKeyForOrg', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // this is important
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should return the serverless access key', async () => {
    process.env.SERVERLESS_ACCESS_KEY = 'serverless_access_key'

    const result = await getAccessKeyForOrg('org')
    expect(result).toEqual('serverless_access_key')
  })

  it('should throw an error when org is not defined', async () => {
    try {
      await getAccessKeyForOrg('')
    } catch (e) {
      expect.arrayContaining(['Error: SDK: getAccessKeyForOrg() requires a "org".'])
    }
  })

  it('should throw an error when a user does not have an access key', async () => {
    try {
      await getAccessKeyForOrg('foo')
    } catch (e) {
      expect.arrayContaining([
        'Error: Could not find an access key for org foo.  Log out and log in again to create a new access key for this org.'
      ])
    }
  })

  it('should return the access key for a user and org', async () => {
    const result = await getAccessKeyForOrg('foo')
    expect(result).toEqual('serverless_access_key')
  })
})

describe('createAccessKeyForOrg', () => {
  it('should fetch an access key', async () => {
    const result = await createAccessKeyForOrg('foo', 'foobar')
    expect(result).toEqual('secret_access_key')
  })
})
