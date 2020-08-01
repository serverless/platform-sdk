import fetch from 'cross-fetch'
import { getService } from '.'
import platformConfig from '../config'

jest.mock('cross-fetch', () =>
  jest.fn().mockReturnValue(
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({
        appId: 'test',
        tenantName: 'test',
        appName: 'test',
        serviceName: 'test',
        stagesAndRegions: {
          dev: {
            'us-east-1': {
              outputs: {},
              archived: false,
              createdAt: '2019-12-23T13:49:26.129Z',
              logsRoleArn: 'arn:aws:iam::test',
              updatedAt: '2020-01-17T15:07:32.565Z',
              lastActionBy: 'test'
            }
          }
        },
        vcs: {
          type: 'git',
          branch: 'dashboard',
          commit: '6713d41076aab4e505ba2dca704fe491968d7bdb',
          commitMessage: 'Update',
          committerEmail: 'test@test.com',
          relativePath: ''
        },
        lastActionBy: 'test',
        isArchived: false,
        createdAt: '2019-12-23T13:49:26.157Z',
        updatedAt: '2020-01-17T15:07:32.592Z',
        stateItems: []
      })
    })
  )
)

afterAll(() => jest.restoreAllMocks())

describe('getService', () => {
  test('it fetches data', async () => {
    const data = {
      accessKey: 'test',
      app: 'someapp',
      tenant: 'sometenant',
      service: 'somename'
    }

    await getService(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${data.service}`,
      {
        method: 'GET',
        headers: { Authorization: `bearer ${data.accessKey}` }
      }
    )
  })
})
