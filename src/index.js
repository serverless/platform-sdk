require('./nodeJsRuntime')

const service = require('./service')
const deployments = require('./deployments')
const apps = require('./apps')
const tenants = require('./tenants')
const accessKeys = require('./accessKeys')
const login = require('./login')
const credentials = require('./credentials')
const rcfile = require('./rcfile')
const logs = require('./logs')

module.exports = {
  ...service,
  ...deployments,
  ...apps,
  ...tenants,
  ...accessKeys,
  ...login,
  ...credentials,
  ...rcfile,
  ...logs
}
