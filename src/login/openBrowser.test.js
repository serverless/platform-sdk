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
