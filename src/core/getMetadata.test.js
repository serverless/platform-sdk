import getMetadata from './getMetadata'
import fetch from 'isomorphic-fetch'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: jest.fn().mockReturnValue(Promise.resolve({ accountId: '11111' }))
    })
  )
)

describe('getMetadata', () => {
  it('fetches metadata from the platform', async () => {
    const response = await getMetadata('TOKEN')
    expect(response).toEqual({ accountId: '11111' })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/meta', {
      headers: { Authorization: 'bearer TOKEN' }
    })
  })
})
