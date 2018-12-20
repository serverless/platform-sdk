const { getCredentialsUrl } = require('./')
const platformConfig = require('../config')

describe('getCredentialsUrl', () => {
  test('it return a correct service URL', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      name: 'somename'
    }

    const serviceUrl = getCredentialsUrl(data)

    expect(serviceUrl).toEqual(
      `${platformConfig.backendUrl}tenants/${data.tenant}/credentials/keys`
    )
  })
})
