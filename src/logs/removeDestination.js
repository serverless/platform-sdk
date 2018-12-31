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

  return fetch(`${getLogDestinationUrl()}/destinations/delete`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkStatus)
    .then((res) => res.json())
    .catch(() => null)
}

export default removeLogDestination
