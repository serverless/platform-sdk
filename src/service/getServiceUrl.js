import platformConfig from '../config'

const getServiceUrl = (data) => {
  return `${platformConfig.frontendUrl}tenants/${data.tenant}/applications/${data.app}/services/${data.name}`
}

export default getServiceUrl
