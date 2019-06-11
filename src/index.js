require('./runtime')

const Deployment = require('./deployments').default
const service = require('./service')
const apps = require('./apps')
const tenants = require('./tenants')
const accessKeys = require('./accessKeys')
const login = require('./login')
const logout = require('./logout')
const utils = require('./utils')
const logs = require('./logs')
const secrets = require('./secrets')
const safeguards = require('./safeguards')
const urls = require('./config')
const { configureFetchDefaults } = require('./fetch')
const core = require('./core')
const register = require('./register')
const deployProfiles = require('./deployProfiles')
const stateVariables = require('./stateVariables')

module.exports = {
  Deployment,
  ...core,
  ...register,
  ...service,
  ...apps,
  ...tenants,
  ...accessKeys,
  ...login,
  ...logout,
  ...utils,
  ...logs,
  ...secrets,
  ...safeguards,
  ...deployProfiles,
  ...stateVariables,
  urls,
  configureFetchDefaults
}
