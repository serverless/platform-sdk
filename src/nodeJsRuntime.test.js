describe('nodeJsRuntime', () => {
  test('it registers regeneratorRuntime', () => {
    jest.resetModules()
    global.regeneratorRuntime = undefined
    require('./nodeJsRuntime')
    expect(global.regeneratorRuntime).toBeDefined()
  })
})
