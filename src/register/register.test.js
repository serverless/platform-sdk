import { register } from './'
import fetch from 'isomorphic-fetch'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      json: jest.fn().mockReturnValue(Promise.resolve({ accountId: '11111' }))
    })
  )
)

describe('register', () => {
  it('posts to register endpoint', async () => {
    const response = await register('sue@example.com', 'hunter2')
    expect(response).toEqual({ accountId: '11111' })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/register', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({ email: 'sue@example.com', password: 'hunter2' })
    })
  })
})
