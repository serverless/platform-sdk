const fetch = require('isomorphic-fetch')

const archive = async (config, data) => {
  return fetch(`${config.url}/abc/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${config.token}`
    }
  }).then((response) => {
    if (response.status !== 202) {
      // TODO improve throwed errors
      throw new Error('Failed to archive service')
    }
    return response
  })
}

export default archive
