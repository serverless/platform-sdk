import { getServiceUrl } from './'
import platformConfig from '../config'

describe('getServiceUrl', () => {
  test('it return a correct service URL', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      name: 'somename'
    }

    const serviceUrl = getServiceUrl(data)

    expect(serviceUrl).toEqual(
      `${platformConfig.frontendUrl}tenants/${data.tenant}/applications/${data.app}/services/${
        data.name
      }`
    )
  })
})
