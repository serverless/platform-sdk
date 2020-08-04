import { getDeployProfiles } from './'
import fetch from 'node-fetch'

jest.mock('node-fetch', () =>
  jest.fn().mockImplementation((url) => {
    if (url.endsWith('/org-with-profile/deploymentProfiles')) {
      return {
        ok: true,
        status: 200,
        json: async () => [
          {
            deploymentProfileUid: 'M4jgvGmqvxWC3YR6M1bk5K2HQGr69S',
            name: 'default',
            description: 'Example deployment profile with useful defaults',
            secrets: [],
            providerCredentials: null,
            safeguardsPolicies: [],
            createdAt: '2019-06-11T14:35:47.903Z'
          }
        ]
      }
    }
    return { ok: true, json: async () => [] }
  })
)

afterAll(() => jest.restoreAllMocks())

describe('getDeployProfiles', () => {
  it('fetches deployment profiles from API', async () => {
    const result = await getDeployProfiles({ accessKey: 'accessKey', tenant: 'org-with-profile' })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/org-with-profile/deploymentProfiles',
      {
        headers: { Authorization: `bearer accessKey` }
      }
    )
    expect(result).toEqual([
      {
        deploymentProfileUid: 'M4jgvGmqvxWC3YR6M1bk5K2HQGr69S',
        name: 'default',
        description: 'Example deployment profile with useful defaults',
        secrets: [],
        providerCredentials: null,
        safeguardsPolicies: [],
        createdAt: '2019-06-11T14:35:47.903Z'
      }
    ])
  })

  it('fetches returns empty deployment profiles responses too', async () => {
    const result = await getDeployProfiles({ accessKey: 'accessKey', tenant: 'wrongorg' })
    expect(fetch).toBeCalledWith(
      'https://api.serverless.com/core/tenants/wrongorg/deploymentProfiles',
      {
        headers: { Authorization: `bearer accessKey` }
      }
    )
    expect(result).toEqual([])
  })
})
