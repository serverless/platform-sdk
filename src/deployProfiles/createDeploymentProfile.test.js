import { createDeploymentProfile } from './'
import fetch from 'cross-fetch'

jest.mock('cross-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => ({
      appName: 'appName',
      tenantName: 'org',
      appUid: 'appId',
      title: 'appName',
      tenantUid: 'tenantId',
      deploymentProfiles: { default: 'profileId' }
    })
  })
)

afterAll(() => jest.restoreAllMocks())

describe('createDeploymentProfile', () => {
  it('fetches deployment profiles from API', async () => {
    const result = await createDeploymentProfile({
      accessKey: 'accessKey',
      tenant: 'org',
      name: 'default'
    })
    expect(fetch).toBeCalledWith('https://api.serverless.com/core/tenants/org/deploymentProfiles', {
      headers: { Authorization: `bearer accessKey` },
      method: 'POST',
      body: JSON.stringify({
        name: 'default',
        description: 'A description was not provided for this profile',
        secrets: [],
        safeguardsPolicies: [],
        providerCredentials: null
      })
    })
    expect(result).toEqual()
  })
})
