const platformStage = process.env.SERVERLESS_PLATFORM_STAGE || 'prod'

const config = {
  local: {
    frontendUrl: 'http://localhost:3000/',
    backendUrl: 'https://localhost:3011/core/',
    loginBrokerUrl: 'https://api.serverless-dev.com/login/',
    logDestinationUrl: 'https://api.serverless-dev.com/malt/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  preview: {
    frontendUrl: 'https://deploy-preview-281--eg-dashboard-dev.netlify.com/',
    backendUrl: 'https://api.serverless-dev.com/core/',
    loginBrokerUrl: 'https://api.serverless-dev.com/login/',
    logDestinationUrl: 'https://api.serverless-dev.com/malt/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  dev: {
    frontendUrl: 'https://dashboard.serverless-dev.com/',
    backendUrl: 'https://api.serverless-dev.com/core/',
    loginBrokerUrl: 'https://api.serverless-dev.com/login/',
    logDestinationUrl: 'https://api.serverless-dev.com/malt/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  qa: {
    frontendUrl: 'https://dashboard.serverless-qa.com/',
    backendUrl: 'https://api.serverless-qa.com/core/',
    loginBrokerUrl: 'https://api.serverless-qa.com/login/',
    logDestinationUrl: 'https://api.serverless-qa.com/malt/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  prod: {
    frontendUrl: 'https://dashboard.serverless.com/',
    backendUrl: 'https://api.serverless.com/core/',
    loginBrokerUrl: 'https://api.serverless.com/login/',
    logDestinationUrl: 'https://api.serverless.com/malt/',
    auth0Domain: 'serverlessinc.auth0.com',
    auth0ClientId: 'YAHOG8papb1tkrLttNVoVOSs4YLOjrNj'
  }
}

module.exports = config[platformStage]

if (process.env.SERVERLESS_PLATFORM_FRONTEND_URL) {
  module.exports.frontendUrl = process.env.SERVERLESS_PLATFORM_FRONTEND_URL
}
