import getManagedAccounts from './getManagedAccounts'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => [
      {
        managedAccountUid: '1R7FhU8ucLTc1BJ9HE2Bnk0qMjn',
        status: 'SUCCEEDED',
        awsAccountId: '936085355933',
        resources: {
          deploymentRole: 'arn:aws:iam::428152047904:role/serverless-enterprise'
        }
      },
      {
        managedAccountUid: '0ujsszgFvbiEr7CDgE3z8MAUPFt',
        status: 'IN_PROGRESS'
      }
    ]
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getManagedAccounts', () => {
  it('fetches managed account list from API', async () => {
    const result = await getManagedAccounts({
      accessKey: 'accessKey',
      tenant: 'tenant'
    })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants/tenant/managedAccounts', {
      method: 'GET',
      headers: { Authorization: 'bearer accessKey' }
    })
    expect(result).toEqual([
      {
        managedAccountUid: '1R7FhU8ucLTc1BJ9HE2Bnk0qMjn',
        status: 'SUCCEEDED',
        awsAccountId: '936085355933',
        resources: {
          deploymentRole: 'arn:aws:iam::428152047904:role/serverless-enterprise'
        }
      },
      {
        managedAccountUid: '0ujsszgFvbiEr7CDgE3z8MAUPFt',
        status: 'IN_PROGRESS'
      }
    ])
  })
})
