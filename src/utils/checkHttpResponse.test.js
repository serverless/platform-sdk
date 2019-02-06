import checkHttpResponse from './checkHttpResponse'

describe('checkHttpResponse', () => {
  it('returns the response if nothing is wrong', async () => {
    const resp = { ok: true }
    expect(await checkHttpResponse(resp)).toEqual(resp)
  })

  it('throw an error with authn message if 401 is returned', async () => {
    const resp = {
      ok: false,
      statusCode: 401,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp)
    } catch (err) {
      expect(err.message).toEqual(
        'Authentication error. Please check your credentials. Server Message'
      )
    }
  })

  it('throw an error with authz message if 403 is returned', async () => {
    const resp = {
      ok: false,
      statusCode: 403,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp)
    } catch (err) {
      expect(err.message).toEqual(
        'Authorization error. You are not permitted to perform this action. Server Message'
      )
    }
  })

  it('throw an error on non 401&403 error', async () => {
    const resp = {
      ok: false,
      statusCode: 400,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp)
    } catch (err) {
      expect(err.message).toEqual('Server Message')
    }
  })

  it('throw an error with authn message if 401 is returned with prefix', async () => {
    const resp = {
      ok: false,
      statusCode: 401,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp, 'Some Contextual Prefix')
    } catch (err) {
      expect(err.message).toEqual(
        'Some Contextual Prefix: Authentication error. Please check your credentials. Server Message'
      )
    }
  })

  it('throw an error with authz message if 403 is returned with prefix', async () => {
    const resp = {
      ok: false,
      statusCode: 403,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp, 'Some Contextual Prefix')
    } catch (err) {
      expect(err.message).toEqual(
        'Some Contextual Prefix: Authorization error. You are not permitted to perform this action. Server Message'
      )
    }
  })

  it('throw an error on non 401&403 error with prefix', async () => {
    const resp = {
      ok: false,
      statusCode: 400,
      text: jest.fn().mockReturnValue(Promise.resolve('Server Message'))
    }
    try {
      await checkHttpResponse(resp, 'Some Contextual Prefix')
    } catch (err) {
      expect(err.message).toEqual('Some Contextual Prefix: Server Message')
    }
  })
})
