import fetch from 'isomorphic-fetch'
import getLogDestinationUrl from './destinationUrl'
import { checkStatus } from '../fetchUtils'

const createDestination = async ({ sls: { service, cli }, provider }) => {
  const { Account } = await provider.request('STS', 'getCallerIdentity', {})
  const body = JSON.stringify({
    tenantName: service.tenant,
    appName: service.app,
    serviceName: service.getServiceName(),
    stageName: provider.getStage(),
    regionName: provider.getRegion(),
    accountId: Account
  })

  return fetch(`${getLogDestinationUrl()}/destinations/create`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(checkStatus)
    .then((res) => res.json())
    .catch(() => cli.log('Could not get CloudWatch Logs Destination from Serverless Platform.'))
}

export default createDestination
