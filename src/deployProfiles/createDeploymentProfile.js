import fetch from '../fetch'
import platformConfig from '../config'

export default async ({
  accessKey,
  tenant,
  name,
  description = 'A description was not provided for this profile',
  secrets = [],
  safeguardsPolicies = [],
  providerCredentials = null
}) => {
  await fetch(`${platformConfig.backendUrl}tenants/${tenant}/deploymentProfiles`, {
    method: 'POST',
    headers: { Authorization: `bearer ${accessKey}` },
    body: JSON.stringify({ name, description, secrets, safeguardsPolicies, providerCredentials })
  })
}
