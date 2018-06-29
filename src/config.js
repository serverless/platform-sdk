const platformStage = process.env.SERVERLESS_PLATFORM_STAGE || 'prod'

const config = {
  local: {
    frontendUrl: 'http://localhost:3000/',
    backendUrl: 'https://5xe6lexe8e.execute-api.us-east-1.amazonaws.com/dev/'
  },
  preview: {
    frontendUrl: 'https://deploy-preview-124--eg-dashboard-dev.netlify.com/',
    backendUrl: 'https://5xe6lexe8e.execute-api.us-east-1.amazonaws.com/dev/'
  },
  dev: {
    frontendUrl: 'https://dashboard.serverless-dev.com/',
    backendUrl: 'https://5xe6lexe8e.execute-api.us-east-1.amazonaws.com/dev/'
  },
  prod: {
    frontendUrl: 'https://dashboard.serverless.com/',
    backendUrl: 'https://jnvhp1any0.execute-api.us-east-1.amazonaws.com/prod/'
  }
}

module.exports = config[platformStage]
