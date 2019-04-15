import getTokens from './getTokens'

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

describe('getTokens', () => {
  it('should get the tokens', async () => {
    const result = await getTokens('code')
    expect(result).toEqual({
      access_token: 'access_token',
      expires_in: 10000,
      id_token: 'id_token',
      secretAccessKey: 'secret_access_key'
    })
  })
})
