import { getDeployProfile } from './'
import fetch from 'isomorphic-fetch'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockImplementation((url) => {
    if (url.endsWith('/app-with-profile/profileValue')) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          safeguardsPolicies: [
            {
              ruleName: 'Rule!',
              policyId: 'xyz',
              policyName: 'policy',
              policyConfig: {},
              enforcementLevel: 'mandatory'
            }
          ],
          secretValues: []
        })
      }
    }
    return { ok: true, status: 204 }
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getDeployProfile', () => {
  it('fetches deployment profile from API', async () => {
    const result = await getDeployProfile({
      accessKey: 'accessKey',
      app: 'app-with-profile',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/applications/app-with-profile/profileValue',
      {
        method: 'POST',
        headers: { Authorization: `bearer accessKey` },
        body: JSON.stringify({ stageName: 'stage', serviceName: 'service' })
      }
    )
    expect(result).toEqual({
      safeguardsPolicies: [
        {
          ruleName: 'Rule!',
          policyId: 'xyz',
          policyName: 'policy',
          policyConfig: {},
          enforcementLevel: 'mandatory'
        }
      ],
      secretValues: []
    })
  })

  it('fetches returns an empty profile when the API returns 204', async () => {
    const result = await getDeployProfile({
      accessKey: 'accessKey',
      app: 'wrong-app',
      service: 'service',
      tenant: 'tenant',
      stage: 'stage'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/tenant/applications/wrong-app/profileValue',
      {
        method: 'POST',
        headers: { Authorization: `bearer accessKey` },
        body: JSON.stringify({ stageName: 'stage', serviceName: 'service' })
      }
    )
    expect(result).toEqual({ safeguardsPolicies: [], secretValues: [], providerCredentials: null })
  })
})
