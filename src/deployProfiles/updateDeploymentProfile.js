import fetch from '../fetch'
import platformConfig from '../config'

export default async ({
  accessKey,
  tenant,
  name,
  deploymentProfileUid,
  description = 'A description was not provided for this profile',
  secrets = [],
  safeguardsPolicies = [],
  providerCredentials = null
}) => {
  await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/deploymentProfiles/${deploymentProfileUid}`,
    {
      method: 'PATCH',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({ name, description, secrets, safeguardsPolicies, providerCredentials })
    }
  )
}
