# Platform SDK
Functional SDK for the Serverless Platfrom.

## Contents

- [Installation](#installation)
- [Functions](#functions)
  - [login](#login)
  - [createAccessKey](#createaccesskey)
  - [publishService](#publishservice)
  - [archiveService](#archiveservice)

## installation

```
npm i -s @serverless/platform-sdk
```

## Functions
### `login`
Opens a browser for the user to login, along with a running server awaiting auth data once the user logs in.

**Parameters**

None

**Returns**

Promise resolving to the following object:

- `username` - `string` - dashboard username
- `accessToken` - `string` - Auth0 access token
- `idToken` - `string` - Auth0 idToken
- `expiresAt` - `string` - epoch time at which the idToken expires

**Example**

```js
const { login } = require('@serverless/platform-sdk')

const { username, accessToken, idToken, expiresAt } = await login()
```

---

### `createAccessKey`
Creates a platform access key for the authenticated user.

**Parameters**

Object

- `username` - `string` - dashboard username
- `tenant` - `string` - dashboard tenant
- `idToken` - `string` - Auth0 idToken
- `title` - `string` - title of the access key

**Returns**

Promise resolving to an `accessKey` string, that is the access key.

**Example**

```js
const { createAccessKey } = require('@serverless/platform-sdk')

const data = {
  username: 'eahefnawy',
  tenant: 'eahefnawy',
  idToken: 'abc',
  title: 'Framework'
}

const accessKey = await createAccessKey(data)
```

---

### `publishService`
Publishes a service to the platform.

**Parameters**

Object

- `tenant` - `string` - dashboard tenant
- `accessKey` - `string` - dashboard access key
- `app` - `string` - service app
- `service` - `object` - service object
    - `name` - `string` - service name
    - `stage` - `string` - service stage
    - ...any other service meta data
- `functions` - `array` - list of functions to publish. Each array item is an `object` with the following structure:
    - `functionId` - `string` - unique function identifier
    - `details` - `object` - function details data
    - `package` - `object` - package details data
- `subscriptions` - `array` - list of functions to publish. Each array item is an `object` with the following structure:
    - `functionId` - `string` - unique function identifier this subscription belongs to
    - `subscriptionId` - `string` - unique subscription identifier
    - `type` - `string` - type of subscription (ie. `aws.s3.objectCreated` or `user.created`)
    - `event` - `object` - event data


**Returns**

Promise resolving to a `serviceUrl` string that is the service url.

**Example**

```js
const { publishService } = require('@serverless/platform-sdk')

const data = {
  tenant: 'eahefnawy',
  accessKey: 'abc',
  app: 'my-app',
  service: {
    name: 'my-service',
  },
  functions: [{
    functionId: 'abc',
    memory: 512
    ...
  }],
  subscriptions: [{
    functionId: 'abc',
    subscriptionId: 'abc',
    type: 'aws.apigateway.http',
    event: {
      path: 'users',
      method: 'get',
      ...
    }
  }]
}

const serviceUrl = await publishService(data)
```

---

### `archiveService`
Archives a service in the platform.

**Parameters**

Object

- `tenant` - `string` - dashboard tenant
- `accessKey` - `string` - dashboard access key
- `app` - `string` - service app
- `name` - `string` - service name


**Returns**

None

**Example**

```js
const { archiveService } = require('@serverless/platform-sdk')

const data = {
  tenant: 'eahefnawy',
  accessKey: 'abc',
  app: 'my-app',
  name: 'my-service'
}

await archiveService(data)
```

---

