import { updateDeploymentProfile } from './'
import fetch from 'isomorphic-fetch'

jest.mock('isomorphic-fetch', () =>
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

describe('updateDeploymentProfile', () => {
  it('updates the deployment profile', async () => {
    const result = await updateDeploymentProfile({
      accessKey: 'accessKey',
      tenant: 'org',
      name: 'default',
      deploymentProfileUid: 'deploymentProfileUid'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/org/deploymentProfiles/deploymentProfileUid',
      {
        headers: { Authorization: `bearer accessKey` },
        method: 'PATCH',
        body: JSON.stringify({
          name: 'default',
          description: 'A description was not provided for this profile',
          secrets: [],
          safeguardsPolicies: [],
          providerCredentials: null
        })
      }
    )
    expect(result).toEqual()
  })
})
