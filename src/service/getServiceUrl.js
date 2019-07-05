import platformConfig from '../config'

const getServiceUrl = (data) => {
  return `${platformConfig.frontendUrl}orgs/${data.org}/applications/${data.app}/services/${data.name}`
}

export default getServiceUrl
