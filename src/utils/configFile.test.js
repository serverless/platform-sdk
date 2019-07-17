jest.mock('write-file-atomic', () => ({})) // apparently needs stuff from `fs` to even be imported

describe('configFile', () => {
  it('getLoggedInUser returns user!', () => {
    const { getLoggedInUser } = require('./configFile')
    jest.mock('fs', () => ({
      readFileSync: jest.fn().mockReturnValue(
        new Buffer(
          JSON.stringify({
            userId: 'USER',
            users: {
              USER: {
                dashboard: {
                  username: 'USERNAME',
                  accessKeys: 'KEYS',
                  idToken: 'TOKEN'
                }
              }
            }
          })
        )
      ),
      existsSync: jest.fn().mockReturnValue(true)
    }))
    expect(getLoggedInUser()).toEqual({
      userId: 'USER',
      username: 'USERNAME',
      accessKeys: 'KEYS',
      idToken: 'TOKEN'
    })
  })
})
