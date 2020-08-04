import getSafeguards from './getSafeguards'
import fetch from 'node-fetch'
jest.mock('node-fetch', () =>
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
    expect(
      fetch
    ).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/safeguards/policies/?appName=app',
      { method: 'GET', headers: { Authorization: `bearer accessKey` } }
    )
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
