/*
 * Login (Identity)
 * - Initiates a login transaction with the login broker
 * - Returns an object with two promise properties
 * - `transactionId` is a promise which resolves with an ID to be used by the frontend when sending the login information
 * - `loginData` is a promise which resolves with an object containing at least `idToken`, and other propoerties supplied by the frontend (e.g. `refreshToken`)
 */

const WS = require('ws')
const platformConfig = require('../config')

module.exports = function loginIdentity() {
  const ws = new WS(`${platformConfig.loginBrokerUrl}broker`, undefined, { followRedirects: true })

  let resolveTransactionId, rejectTransactionId
  const transactionId = new Promise((resolve, reject) => {
    resolveTransactionId = resolve
    rejectTransactionId = reject
  })

  let resolveLoginData, rejectLoginData
  const loginData = new Promise((resolve, reject) => {
    resolveLoginData = resolve
    rejectLoginData = reject
  })

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg)
      switch (data.event) {
        case 'ready':
          resolveTransactionId(data.transactionId)
          break
        case 'fulfilled':
          delete data.event
          resolveLoginData(data)
          ws.terminate()
          break
        default:
          throw new Error(
            'Encountered an unexpected message while waiting for login information. Your Serverless Framework or SDK may be out of date.'
          )
      }
    } catch (error) {
      rejectTransactionId(error)
      rejectLoginData(error)
      ws.terminate()
    }
  })

  ws.on('open', () => {
    ws.send('{"action":"login"}')
  })

  return {
    transactionId,
    loginData
  }
}
