/* eslint-disable no-console */

import opn from 'opn'
import chalk from 'chalk'
import isDockerContainer from 'is-docker'

function displayManualOpenMessage(url, err) {
  // https://github.com/sindresorhus/log-symbols
  console.log('---------------------------')
  const errMsg = err ? `\nError: ${err.message}` : ''
  const msg = `Unable to open browser automatically${errMsg}`
  console.log(`🙈  ${chalk.red(msg)}`)
  console.log(chalk.green('Please open your browser & open the URL below to login:'))
  console.log(chalk.yellow(url))
  console.log('---------------------------')
  return false
}

module.exports = function openBrowser(url) {
  let browser = process.env.BROWSER
  if (browser === 'none' || isDockerContainer()) {
    return displayManualOpenMessage(url)
  }
  if (process.platform === 'darwin' && browser === 'open') {
    browser = undefined
  }
  const options = { wait: false, app: browser }
  return opn(url, options).catch((err) => displayManualOpenMessage(url, err))
}
