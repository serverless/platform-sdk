import getDeployProfile from './getDeployProfile'
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({
      safeguards: [
        {
          ruleName: 'Rule!',
          policyId: 'xyz',
          policyName: 'policy',
          policyConfig: {},
          enforcementLevel: 'mandatory'
        }
      ]
    })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getDeployProfile', () => {
  it('fetches deployment profile from API', async () => {
    const result = await getDeployProfile({
      accessKey: 'accessKey',
      app: 'app',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/applicaitons/app/profileValue',
      {
        method: 'POST',
        headers: { Authorization: `bearer accessKey` },
        body: JSON.stringify({ stageName: 'stage', serviceName: 'service' })
      }
    )
    expect(result).toEqual({
      safeguards: [
        {
          ruleName: 'Rule!',
          policyId: 'xyz',
          policyName: 'policy',
          policyConfig: {},
          enforcementLevel: 'mandatory'
        }
      ]
    })
  })
})
