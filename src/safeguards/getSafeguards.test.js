import getSafeguards from './getSafeguards'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => [
      {
        ruleName: 'Rule!',
        policyId: 'xyz',
        policyName: 'policy',
        policyConfig: {},
        enforcementLevel: 'mandatory'
      }
    ]
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getSafeguards', () => {
  it('fetches secret from API', async () => {
    const result = await getSafeguards({
      accessKey: 'accessKey',
      app: 'app',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage'
    })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants/tenant/safeguards', {
      method: 'POST',
      body: JSON.stringify({
        appName: 'app',
        serviceName: 'service',
        stageName: 'stage'
      }),
      headers: { Authorization: `bearer accessKey` }
    })
    expect(result).toEqual([
      {
        ruleName: 'Rule!',
        policyId: 'xyz',
        policyName: 'policy',
        policyConfig: {},
        enforcementLevel: 'mandatory'
      }
    ])
  })
})
