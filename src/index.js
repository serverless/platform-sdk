require('./runtime')

const service = require('./service')
const deployments = require('./deployments')
const apps = require('./apps')
const tenants = require('./tenants')
const accessKeys = require('./accessKeys')
const login = require('./login')
const logout = require('./logout')
const credentials = require('./credentials')
const utils = require('./utils')
const logs = require('./logs')

module.exports = {
  ...service,
  ...deployments,
  ...apps,
  ...tenants,
  ...accessKeys,
  ...login,
  ...logout,
  ...credentials,
  ...utils,
  ...logs
}
