/* eslint-disable no-console */

import opn from 'opn'
import chalk from 'chalk'
import isDockerContainer from 'is-docker'

module.exports = function openBrowser(url) {
  let browser = process.env.BROWSER
  if (browser === 'none' || isDockerContainer()) {
    console.log(chalk.green('Please open your browser & open the URL below to login:'))
    console.log(chalk.yellow(url))
    return false
  }
  if (process.platform === 'darwin' && browser === 'open') {
    browser = undefined
  }
  console.log(
    chalk.green(
      'If your browser does not open automatically, please open it &  open the URL below to log in:'
    )
  )
  console.log(chalk.yellow(url))
  const options = { wait: false, app: browser }
  return opn(url, options).catch(() => false)
}
