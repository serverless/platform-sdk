import getLogDestinationUrl from './destinationUrl'
import platformConfig from '../config'

describe('getLogDestinationUrl', () => {
  test('it return a correct service URL', async () => {
    const data = {
      app: 'someapp',
      tenant: 'sometenant',
      name: 'somename'
    }

    const serviceUrl = getLogDestinationUrl(data)

    expect(serviceUrl).toEqual(`${platformConfig.logDestinationUrl}/TODO`)
  })
})
