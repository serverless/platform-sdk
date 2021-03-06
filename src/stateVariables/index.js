import fetch from '../fetch'
import platformConfig from '../config'

export const getStateVariable = async ({
  accessKey,
  outputName,
  app,
  tenant,
  stage,
  service,
  region
}) => {
  const response = await fetch(
    `${platformConfig.backendUrl}tenants/${tenant}/applications/${app}/services/${service}/stages/${stage}/regions/${region}/outputs`,
    {
      method: 'POST',
      headers: { Authorization: `bearer ${accessKey}` },
      body: JSON.stringify({ outputName })
    }
  )

  return response.json()
}
