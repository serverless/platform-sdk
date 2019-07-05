/*
 * Deployment
 */

import ramda from 'ramda'
import { version as packageJsonVersion } from '../../package.json'
import platformConfig from '../config'
import { getAccessKeyForOrg } from '../accessKeys'
import fetch from '../fetch'

export default class {
  constructor() {
    this.data = {
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

      serverlessFile: null,
      serverlessFileName: null,
      orgUid: null,
      appUid: null,
      orgName: null,
      appName: null,
      serviceName: null,
      stageName: null,
      regionName: null,

      // the arn generated for fetching constructed logs
      logsRoleArn: null,

      status: null, // success OR errror
      error: null,

      // IF ARCHIVED... everything below this will be null
      archived: false,

      /*
       * App Data
       * - Provider, functions, subscriptions, resources, etc...
       * - Function-defaults in `provider` will be replicated across each function
       */

      provider: { type: 'aws' },

      functions: {},
      subscriptions: [],
      resources: {},
      layers: {},
      plugins: [],
      safeguards: [],
      secrets: [],
      outputs: {},
      custom: {}
    }
  }

  /*
   * Get
   */

  get() {
    return this.data
  }

  /*
   * Set
   */

  set(data) {
    // TODO: Validate
    this.data = ramda.mergeDeepRight(this.data, data)
    return this.data
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
      timeout: null,
      // Provider-specific data goes here
      custom: {
        handler: null,
        memorySize: null,
        runtime: null,
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

    this.data.functions[data.name] = ramda.mergeDeepRight(fn, data)
    return this.data.functions[data.name]
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
    if (!this.data.functions[data.function]) {
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
    switch (data.type) {
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
    this.data.subscriptions.push(sub)

    return sub
  }

  /*
   * Save
   */

  async save() {
    // Create backend & frontend urls
    let dashboardApi = platformConfig.backendUrl
    dashboardApi += `orgs/${this.data.orgName}/`
    dashboardApi += `applications/${this.data.appName}/`
    dashboardApi += `services/${this.data.serviceName}/`
    dashboardApi += `stages/${this.data.stageName}/`
    dashboardApi += `regions/${this.data.regionName}/`
    dashboardApi += `deployments`

    let dashboardUrl = platformConfig.frontendUrl
    dashboardUrl += `orgs/${this.data.orgName}/`
    dashboardUrl += `applications/${this.data.appName}/`
    dashboardUrl += `services/${this.data.serviceName}/`
    dashboardUrl += `stage/${this.data.stageName}/`
    dashboardUrl += `region/${this.data.regionName}`

    // Fetch access key
    const accessKey = await getAccessKeyForOrg(this.data.orgName)

    // Call api to save deployment
    const response = await fetch(dashboardApi, { // eslint-disable-line
      method: 'POST',
      body: JSON.stringify(this.data),
      headers: {
        Authorization: `bearer ${accessKey}`
      }
    })

    return {
      deployment: await response.json(),
      dashboardUrl
    }
  }
}
