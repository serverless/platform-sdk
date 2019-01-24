describe('index', () => {
  test('require runs without error', () => {
    jest.resetModules()
    const mod = require('./')
    expect(mod).toMatchObject({
      createAccessKeyForTenant: expect.any(Function),
      createApp: expect.any(Function),
      getApp: expect.any(Function),
      createDeployment: expect.any(Function),
      updateDeployment: expect.any(Function),
      getTokens: expect.any(Function),
      login: expect.any(Function),
      openBrowser: expect.any(Function),
      refreshToken: expect.any(Function),
      archiveService: expect.any(Function),
      listTenants: expect.any(Function)
    })
  })

  test('registers regeneratorRuntime', () => {
    jest.resetModules()
    global.regeneratorRuntime = undefined
    require('./')
    expect(global.regeneratorRuntime).toBe(require('regenerator-runtime'))
  })
})
