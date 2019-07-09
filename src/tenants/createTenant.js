import fetch from '../fetch'
import platformConfig from '../config'

const createTenant = async (data) => {
  await fetch(`${platformConfig.backendUrl}tenants`, {
    method: 'POST',
    headers: { Authorization: `bearer ${data.token}` },
    body: JSON.stringify({
      title: data.title,
      tenantName: data.tenant,
      ownerUserName: data.ownerUserName
    })
  })
}

export default createTenant
