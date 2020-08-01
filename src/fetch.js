import fs from 'fs'
import https from 'https'
import fetch from 'cross-fetch'
import HttpsProxyAgent from 'https-proxy-agent'
import { checkHttpResponse } from './utils'
import { version as currentVersion } from '../package.json'
import { parse as parseUrl } from 'url'

let agent
let headers

export function getAgent() {
  // Use HTTPS Proxy (Optional)
  const proxy =
    process.env.proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.https_proxy

  const agentOptions = {}
  if (proxy) {
    Object.assign(agentOptions, parseUrl(proxy))
  }

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
    Object.assign(agentOptions, {
      rejectUnauthorized: true,
      ca: caCerts
    })
  }

  if (proxy) {
    return new HttpsProxyAgent(agentOptions)
  } else if (agentOptions.ca) {
    return new https.Agent(agentOptions)
  }
  return undefined
}

export function configureFetchDefaults() {
  agent = getAgent()

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
