const { archiveService } = require('./')
const fetch = require('isomorphic-fetch')
const platformConfig = require('../config')
const currentVersion = require('../../package.json').version

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('archiveService', () => {
  test('it should make a valid request', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      name: 'somename',
      accessKey: 'someaccesskey'
    }

    await archiveService(data)

    expect(fetch).toBeCalledWith(
      `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.name
      }`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-platform-version': currentVersion,
          Authorization: `bearer ${data.accessKey}`
        }
      }
    )
  })
})
