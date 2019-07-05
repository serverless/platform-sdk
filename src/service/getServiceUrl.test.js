import { getServiceUrl } from './'
import platformConfig from '../config'

describe('getServiceUrl', () => {
  test('it return a correct service URL', async () => {
    const data = {
      app: 'someapp',
      org: 'someorg',
      name: 'somename'
    }

    const serviceUrl = getServiceUrl(data)

    expect(serviceUrl).toEqual(
      `${platformConfig.frontendUrl}orgs/${data.org}/applications/${data.app}/services/${data.name}`
    )
  })
})
