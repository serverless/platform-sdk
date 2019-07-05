import { listOrgs } from './'
import fetch from 'isomorphic-fetch'
import platformConfig from '../config'

jest.mock('isomorphic-fetch', () =>
  jest.fn().mockReturnValue({
    ok: true,
    json: async () => {}
  })
)

afterAll(() => jest.restoreAllMocks())

describe('listOrgs', () => {
  test('it should make a valid request', async () => {
    const data = {
      username: 'someusername',
      idToken: 'someIdToken'
    }

    await listOrgs(data)

    expect(fetch).toBeCalledWith(`${platformConfig.backendUrl}orgs?userName=${data.username}`, {
      method: 'GET',
      headers: { Authorization: `bearer ${data.idToken}` }
    })
  })
})
