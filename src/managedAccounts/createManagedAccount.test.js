import createManagedAccount from './createManagedAccount'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({
      managedAccountUid: '1R7FhU8ucLTc1BJ9HE2Bnk0qMjn',
      status: 'IN_PROGRESS'
    })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getManagedAccounts', () => {
  it('fetches managed account list from API', async () => {
    const result = await createManagedAccount({
      accessKey: 'accessKey',
      captchaToken: 'captcha-token',
      tenant: 'tenant'
    })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants/tenant/managedAccounts', {
      method: 'POST',
      headers: { Authorization: 'bearer accessKey', 'X-Captcha-Token': 'captcha-token' },
      body: '{}'
    })
    expect(result).toEqual({
      managedAccountUid: '1R7FhU8ucLTc1BJ9HE2Bnk0qMjn',
      status: 'IN_PROGRESS'
    })
  })
})
