import fs from 'fs'
import path from 'path'
import os from 'os'
import { hasConfigFile, getConfig, getUser } from './rcfile'

jest.mock('fs', () => ({
  ...require.requireActual('fs'),
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(
    JSON.stringify({
      userId: 'user',
      users: {
        user: {
          dashboard: {
            username: 'username',
            idToken: 'idToken',
            foo: 'bar'
          }
        }
      }
    })
  )
}))

describe('hasConfigFile', () => {
  test('it calls fs.existsSync on ~/.serverlessrc', async () => {
    expect(hasConfigFile()).toEqual(true)
    expect(fs.existsSync).toBeCalledWith(path.join(os.homedir(), '.serverlessrc'))
  })
})

describe('getConfig', () => {
  test('it reads the config', async () => {
    expect(getConfig()).toEqual(JSON.parse(fs.readFileSync()))
    expect(fs.existsSync).toBeCalledWith(path.join(os.homedir(), '.serverlessrc'))
  })
})

describe('getUser', () => {
  test('it returns the user from the config file', async () => {
    expect(getUser()).toEqual({
      username: 'username',
      idToken: 'idToken'
    })
    expect(fs.existsSync).toBeCalledWith(path.join(os.homedir(), '.serverlessrc'))
  })
})
