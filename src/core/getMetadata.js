import fetch from '../fetch'
import platformConfig from '../config'

const getMetadata = async (accessKey) => {
  const response = await fetch(`${platformConfig.backendUrl}core/meta`, {
    headers: { Authorization: `bearer ${accessKey}` }
  })

  return response.json()
}

module.exports = getMetadata
