import { listTenants } from './'
import fetch from 'node-fetch'
import platformConfig from '../config'

jest.mock('node-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('listTenants', () => {
  test('it should make a valid request', async () => {
    const data = {
      username: 'someusername',
      idToken: 'someIdToken'
    }

    await listTenants(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}tenants?userName=${data.username}`, {
      method: 'GET',
      headers: { Authorization: `bearer ${data.idToken}` }
    })
  })
})
