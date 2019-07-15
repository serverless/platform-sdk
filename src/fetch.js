import fs from 'fs'
import https from 'https'
import fetch from 'isomorphic-fetch'
import { checkHttpResponse } from './utils'
import { version as currentVersion } from '../package.json'

let agent
let headers

export function configureFetchDefaults() {
  const ca = process.env.ca || process.env.HTTPS_CA || process.env.https_ca

  let caCerts = []

  if (ca) {
    // Can be a single certificate or multiple, comma separated.
    const caArr = ca.split(',')
    // Replace the newline -- https://stackoverflow.com/questions/30400341
    caCerts = caCerts.concat(caArr.map((cert) => cert.replace(/\\n/g, '\n')))
  }

  const cafile = process.env.cafile || process.env.HTTPS_CAFILE || process.env.https_cafile

  if (cafile) {
    // Can be a single certificate file path or multiple paths, comma separated.
    const caPathArr = cafile.split(',')
    caCerts = caCerts.concat(caPathArr.map((cafilePath) => fs.readFileSync(cafilePath.trim())))
  }

  if (caCerts.length > 0) {
    const caOptions = {
      rejectUnauthorized: true,
      ca: caCerts
    }
    // Update the agent -- http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-registering-certs.html
    agent = new https.Agent(caOptions)
  }

  headers = {
    'Content-Type': 'application/json',
    'x-platform-version': currentVersion
  }
}

export default async (url, options = {}) => {
  if (process.env.SDK_HTTP_DEBUG) {
    // eslint-disable-next-line no-console
    console.log(
      `platform-sdk fetching: ${options.method || 'GET'} ${url} ${JSON.stringify(options.headers) ||
        'NO_HEADERS'} ${options.body || 'NO_BODY'}`
    )
  } else if (process.env.SLS_DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`platform-sdk fetching: ${options.method || 'GET'} ${url}`)
  }
  const response = await fetch(url, {
    agent,
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  })
  await checkHttpResponse(response)
  return response
}
