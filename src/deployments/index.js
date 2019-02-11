/*
 * Deployment
 */

import ramda from 'ramda'
import { version as packageJsonVersion } from '../../package.json'
import platformConfig from '../config'
import { getAccessKeyForTenant } from '../accessKeys'

export default class {
  constructor() {
    this._ = {
      /*
       * Versions
       */

      versionFramework: null,
      versionEnterprisePlugin: null,
      versionSDK: packageJsonVersion,

      /*
       * Service Data
       * - Standard service data
       */

      tenantUid: null,
      appUid: null,
      tenantName: null,
      appName: null,
      serviceName: null,
      stageName: null,
      regionName: null,

      // IF ARCHIVED... everything below this will be null
      archived: false,

      /*
       * App Data
       * - Provider, functions, subscriptions, resources, etc...
       * - Function-defaults in `provider` will be replicated across each function
       */

      provider: {
        type: 'aws',
        aws: {}
      },

      functions: {},
      subscriptions: [],
      resources: {},
      layers: {},
      plugins: [],
      custom: {}
    }
  }

  /*
   * Get
   */

  get() {
    return this._
  }

  /*
   * Set
   */

  set(data) {
    // TODO: Validate
    this._ = ramda.mergeDeepRight(this._, data)
    return this._
  }

  /*
   * Set Function
   */

  setFunction(data) {
    if (!data.name) {
      throw new Error(`function 'name' is required`)
    }

    const fn = {
      // Non-provider-specific data goes here
      name: null,
      description: null,
      type: 'awsLambda',
      // Provider-specific data goes here
      custom: {
        handler: null,
        memorySize: null,
        runtime: null,
        timeout: null,
        role: null,
        onError: null,
        awsKmsKeyArn: null,

        tags: {},

        vpc: {
          securityGroupIds: [],
          subnetIds: []
        },

        layers: []
      }
    }

    this._.functions[data.name] = ramda.mergeDeepRight(fn, data)
    return this._.functions[data.name]
  }

  /*
   * Set Subscription
   */

  setSubscription(data) {
    if (!data.type) {
      throw new Error(`subscription 'type' is required`)
    }
    if (!data.function) {
      throw new Error(`subscription 'function' is required`)
    }
    if (!this._.functions[data.function]) {
      throw new Error(
        `subscription 'function' must be added to the deployment before subscriptions`
      )
    }

    let sub = {
      // Non-provider-specific data goes here
      type: null,
      function: null,
      // Provider-specific data goes here
      custom: {}
    }

    // Add custom subscription properties per event type
    switch (sub.type) {
      case 'aws.apigateway.http':
        sub.custom.path = null
        sub.custom.method = null
        sub.custom.restApiId = null
        sub.custom.cors = false
        break
      default:
        break
    }

    sub = ramda.mergeDeepRight(sub, data)
    this._.subscriptions.push(sub)

    return sub
  }

  /*
   * Save
   */

  async save() {
    // Create backend & frontend urls
    let dashboardApi = platformConfig.backendUrl
    dashboardApi += `tenants/${this._.tenantName}/`
    dashboardApi += `applications/${this._.appName}/`
    dashboardApi += `services/${this._.serviceName}/`
    dashboardApi += `stages/${this._.stageName}/`
    dashboardApi += `regions/${this._.regionName}/`
    dashboardApi += `deployments`

    let dashboardUrl = platformConfig.frontendUrl
    dashboardUrl += `tenants/${this._.tenantName}/`
    dashboardUrl += `applications/${this._.appName}/`
    dashboardUrl += `services/${this._.serviceName}/`
    dashboardUrl += `stages/${this._.stageName}/`
    dashboardUrl += `regions/${this._.regionName}`

    // Fetch access key
    const accessKey = await getAccessKeyForTenant(this._.tenantName)

    // Call api to save deployment
    const response = await fetch(dashboardApi, { // eslint-disable-line
      method: 'POST',
      body: JSON.stringify(this._),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${accessKey}`
      }
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text)
    }

    return {
      deployment: response.json(),
      dashboardUrl
    }
  }
}
