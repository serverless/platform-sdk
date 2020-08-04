import { setDefaultDeploymentProfile } from './'
import fetch from 'node-fetch'

jest.mock('node-fetch', () =>
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

describe('setDefaultDeploymentProfile', () => {
  it('fetches deployment profiles from API', async () => {
    const result = await setDefaultDeploymentProfile({
      accessKey: 'accessKey',
      tenant: 'org',
      deploymentProfile: 'profileId',
      app: 'appName'
    })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/org/applications/appName',
      {
        headers: { Authorization: `bearer accessKey` },
        method: 'PATCH',
        body: JSON.stringify({ deploymentProfiles: { default: 'profileId' } })
      }
    )
    expect(result).toEqual({
      appName: 'appName',
      tenantName: 'org',
      appUid: 'appId',
      title: 'appName',
      tenantUid: 'tenantId',
      deploymentProfiles: { default: 'profileId' }
    })
  })
})
