import { getAccessKeyForTenant } from './accessKeys'

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
  getLoggedInUser: jest
    .fn()
    .mockReturnValue({ accessKeys: { foo: 'hgVH317YAhZSL7ptW9zGfC9V061hV9cL' } })
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
    process.env.SERVERLESS_ACCESS_KEY = 'hgVH317YAhZSL7ptW9zGfC9V061hV9cL'

    const result = await getAccessKeyForTenant('tenant')
    expect(result).toEqual('hgVH317YAhZSL7ptW9zGfC9V061hV9cL')
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
    expect(result).toEqual('hgVH317YAhZSL7ptW9zGfC9V061hV9cL')
  })
})
