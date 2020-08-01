import { createTenant } from './'
import fetch from 'cross-fetch'
import platformConfig from '../config'

jest.mock('cross-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('createTenant', () => {
  test('it should make a valid request', async () => {
    const data = {
      title: 'foo-bar',
      tenant: 'foobar',
      ownerUserName: 'someusername',
      token: 'someIdToken'
    }

    await createTenant(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}tenants`, {
      method: 'POST',
      headers: { Authorization: `bearer ${data.token}` },
      body: JSON.stringify({
        title: data.title,
        tenantName: data.tenant,
        ownerUserName: data.ownerUserName
      })
    })
  })
})
