import fetch from 'isomorphic-fetch'
import getLogDestinationUrl from './destinationUrl'
import { checkStatus } from '../fetchUtils'

const removeLogDestination = async ({ sls: { service }, provider }) => {
  const body = JSON.stringify({
    tenantName: service.tenant,
    appName: service.app,
    serviceName: service.getServiceName(),
    stageName: provider.getStage(),
    regionName: provider.getRegion()
  })

  try {
    const resp = await fetch(`${getLogDestinationUrl()}/destinations/delete`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    checkStatus(resp)
    return resp.json()
  } catch (e) {
    return null
  }
}

export default removeLogDestination
