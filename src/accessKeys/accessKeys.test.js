import { getAccessKeyForTenant, createAccessKeyForTenant } from './accessKeys'

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

Date.now = jest.fn().mockReturnValue(1548263344735)

jest.mock('jwt-decode', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      exp: 1548263344735 - 10000
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

describe('getAccessKeyForTenant', () => {
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

    const result = await getAccessKeyForTenant('tenant')
    expect(result).toEqual('serverless_access_key')
  })

  it('should throw an error when tenant is not defined', async () => {
    try {
      await getAccessKeyForTenant('')
    } catch (e) {
      expect.arrayContaining(['Error: SDK: getAccessKeyForTenant() requires a "tenant".'])
    }
  })

  it('should throw an error when a user does not have an access key', async () => {
    try {
      await getAccessKeyForTenant('foo')
    } catch (e) {
      expect.arrayContaining([
        'Error: Could not find an access key for tenant foo.  Log out and log in again to create a new access key for this tenant.'
      ])
    }
  })

  it('should return the access key for a user and tenant', async () => {
    const result = await getAccessKeyForTenant('foo')
    expect(result).toEqual('serverless_access_key')
  })
})

describe('createAccessKeyForTenant', () => {
  it('should fetch an access key', async () => {
    const result = await createAccessKeyForTenant('foo', 'foobar')
    expect(result).toEqual('secret_access_key')
  })
})
