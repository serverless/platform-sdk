import opn from 'opn'
import openBrowser from './openBrowser'

jest.mock('opn', () =>
  jest.fn().mockImplementation((url) => {
    if (url.includes('error')) {
      return Promise.reject('error')
    }
    return Promise.resolve()
  })
)

describe('openBrowser', () => {
  let DISPLAY
  let platform
  beforeAll(() => {
    ;({
      platform,
      env: { DISPLAY }
    } = process)
    process.env.DISPLAY = ':0'
  })
  afterAll(() => {
    process.env.DISPLAY = DISPLAY
    process.platform = platform
  })

  it("doesn't call opn to when BROWSER=none", async () => {
    process.env.BROWSER = 'none'
    await openBrowser('https://foobar')
    expect(opn.mock.calls.length).toEqual(0)
  })

  it("doesn't set app to when platform=darwin & browser=open", async () => {
    process.env.BROWSER = 'open'
    process.platform = 'darwin'
    await openBrowser('https://foobar')
    expect(opn).toBeCalledWith('https://foobar', { wait: false })
  })

  it('call opn to open browser specified in env', async () => {
    process.env.BROWSER = 'firefox'
    await openBrowser('https://foobar')
    expect(opn).toBeCalledWith('https://foobar', { wait: false, app: 'firefox' })
  })

  it('call opn to open browser', async () => {
    delete process.env.BROWSER
    await openBrowser('https://foobar')
    expect(opn).toBeCalledWith('https://foobar', { wait: false })
  })

  it('returns false if it cant open browser', async () => {
    delete process.env.BROWSER
    const result = await openBrowser('https://error')
    expect(result).toBe(false)
    expect(opn).toBeCalledWith('https://error', { wait: false })
  })
})
