import { createTenant } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

jest.mock('isomorphic-fetch', () =>
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
      idToken: 'someIdToken'
    }

    await createTenant(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}tenants`, {
      method: 'POST',
      headers: { Authorization: `bearer ${data.idToken}` },
      body: JSON.stringify({
        title: data.title,
        tenantName: data.tenant,
        ownerUserName: data.ownerUserName
      })
    })
  })
})
