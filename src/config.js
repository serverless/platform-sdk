const { SERVERLESS_PLATFORM_STAGE } = process.env || 'prod'

const config = {
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
    backendUrl: 'https://5xe6lexe8e.execute-api.us-east-1.amazonaws.com/dev/'
  }
}

module.exports = config[SERVERLESS_PLATFORM_STAGE]
