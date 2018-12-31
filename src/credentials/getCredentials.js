import BbPromise from 'bluebird'
import fetch from 'isomorphic-fetch'
import getCredentialsUrl from './getCredentialsUrl'
import { getUser } from '../rcfile'

function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res
  }
  throw new Error(res)
}

export default (ctx) => {
  if (!process.env.SLS_CLOUD_ACCESS) {
    return BbPromise.resolve()
  }
  const user = getUser()
  if (!user) {
    ctx.serverless.cli.log('User not logged in to Platform. Skipping fetch credentials.')
    return BbPromise.resolve()
  }
  const body = JSON.stringify({
    stageName: ctx.provider.getStage(),
    command: ctx.sls.processedInput.commands[0],
    app: ctx.sls.service.app,
    service: ctx.sls.service.getServiceName()
  })

  return fetch(getCredentialsUrl(), {
    method: 'POST',
    body,
    headers: {
      Authorization: `bearer ${user.idToken}`
    }
  })
    .then(checkStatus)
    .then((res) => res.json())
    .then((json) => {
      process.env.AWS_ACCESS_KEY_ID = json.accessKeyId
      process.env.AWS_SECRET_ACCESS_KEY = json.secretAccessKey
      process.env.AWS_SESSION_TOKEN = json.sessionToken
      ctx.sls.cli.log('Cloud credentials set from Serverless Platform.')
      return BbPromise.resolve()
    })
    .catch(() => ctx.sls.cli.log('Could not retrieve credentials from Serverless Platform.'))
}
