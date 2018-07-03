// eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('babel-polyfill')
}
// eslint-disable-next-line global-require
require('source-map-support/register')

const service = require('./service')
const tenants = require('./tenants')
const accessKeys = require('./accessKeys')
const login = require('./login')

module.exports = {
  ...service,
  ...tenants,
  ...accessKeys,
  ...login
}
