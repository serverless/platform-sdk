// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('babel-polyfill')
}
// eslint-disable-next-line global-require
require('source-map-support/register')

const service = require('./service')
const deployments = require('./deployments')
const apps = require('./apps')
const tenants = require('./tenants')
const accessKeys = require('./accessKeys')
const login = require('./login')
const credentials = require('./credentials')
const rcfile = require('./rcfile')

module.exports = {
  ...service,
  ...deployments,
  ...apps,
  ...tenants,
  ...accessKeys,
  ...login,
  ...credentials,
  ...rcfile
}
