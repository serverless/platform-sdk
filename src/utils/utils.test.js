import fs from 'fs'
import path from 'path'
import os from 'os'
import { readConfigFile, getLoggedInUser } from './index.js'

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(
    JSON.stringify({
      userId: 'user',
      users: {
        user: {
          dashboard: {
            username: 'username',
            idToken: 'idToken',
            accessKeys: {}
          }
        }
      }
    })
  )
}))

describe('readConfigFile', () => {
  test('it reads the config', async () => {
    expect(readConfigFile()).toEqual(JSON.parse(fs.readFileSync()))
    expect(fs.existsSync).toBeCalledWith(path.join(os.homedir(), '.serverlessrc'))
  })
})

describe('getLoggedInUser', () => {
  test('it returns the user from the config file', async () => {
    expect(getLoggedInUser()).toEqual({
      userId: 'user',
      username: 'username',
      idToken: 'idToken',
      accessKeys: {}
    })
    expect(fs.existsSync).toBeCalledWith(path.join(os.homedir(), '.serverlessrc'))
  })
})
