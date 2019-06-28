import fetch from '../fetch'
import platformConfig from '../config'

const archiveService = async (data) => {
  const body = {
    provider: data.provider,
    region: data.region
  }
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${data.tenant}/applications/${data.app}/services/${data.name}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { Authorization: `bearer ${data.accessKey}` }
    }
  )

  return response.json()
}

export default archiveService
