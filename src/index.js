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
const logout = require('./logout')
const utils = require('./utils')
const logs = require('./logs')
const secrets = require('./secrets')

module.exports = {
  ...service,
  ...deployments,
  ...apps,
  ...tenants,
  ...accessKeys,
  ...login,
  ...logout,
  ...utils,
  ...logs,
  ...secrets
}
