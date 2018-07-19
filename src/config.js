const platformStage = process.env.SERVERLESS_PLATFORM_STAGE || 'prod'

const config = {
  local: {
    frontendUrl: 'http://localhost:3000/',
    backendUrl: 'https://a0xpn0swpd.execute-api.us-east-1.amazonaws.com/dev/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  preview: {
    frontendUrl: 'https://deploy-preview-162--eg-dashboard-dev.netlify.com/',
    backendUrl: 'https://a0xpn0swpd.execute-api.us-east-1.amazonaws.com/dev/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  dev: {
    frontendUrl: 'https://dashboard.serverless-dev.com/',
    backendUrl: 'https://a0xpn0swpd.execute-api.us-east-1.amazonaws.com/dev/',
    auth0Domain: 'serverlessdev.auth0.com',
    auth0ClientId: 'EMAtx5b2Bf3PB94c3pm9nrADxpFvyZcm'
  },
  prod: {
    frontendUrl: 'https://dashboard.serverless.com/',
    backendUrl: 'https://jnvhp1any0.execute-api.us-east-1.amazonaws.com/prod/',
    auth0Domain: 'serverlessinc.auth0.com',
    auth0ClientId: 'YAHOG8papb1tkrLttNVoVOSs4YLOjrNj'
  }
}

module.exports = config[platformStage]
