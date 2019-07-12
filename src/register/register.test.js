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
    const response = await register('sue@example.com', 'hunter2', 'su', 'su-ten', "sue's tenant")
    expect(response).toEqual({ accountId: '11111' })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        tenantName: 'su-ten',
        title: "sue's tenant",
        ownerUserName: 'su',
        ownerPassword: 'hunter2',
        ownerEmail: 'sue@example.com'
      })
    })
  })
})
