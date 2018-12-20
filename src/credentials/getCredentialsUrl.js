const platformConfig = require('../config')

const getCredentialsUrl = (data) =>
  `${platformConfig.backendUrl}tenants/${data.tenant}/credentials/keys`

export default getCredentialsUrl
