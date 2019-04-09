import fs from 'fs'
import https from 'https'
import fetch from 'isomorphic-fetch'

const defaultOptions = {}

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
    defaultOptions.agent = new https.Agent(caOptions)
  }
}

export default (url, options = {}) => fetch(url, { ...defaultOptions, ...options })
