const checkHttpResponse = async (response, prefix) => {
  if (response.ok) {
    return response
  }

  const msgParts = []
  if (prefix) {
    msgParts.push(`${prefix}:`)
  }
  switch (response.statusCode) {
    case 401:
      msgParts.push('Authentication error. Please check your credentials.')
      break
    case 403:
      msgParts.push('Authorization error. You are not permitted to perform this action.')
      break
  }
  msgParts.push(await response.text())
  throw new Error(msgParts.join(' '))
}

export default checkHttpResponse
