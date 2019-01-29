/*
 * Deployment
 */

const ramda = require('ramda')
const uuidv4 = require('uuid/v4')

class Deployment {
  constructor() {
    this._ = {
      /*
       * Versions
       */

      versionFramework: null,
      versionEnterprisePlugin: null,
      versionSDK: null,

      /*
       * Service Data
       * - Standard service data
       * - `stage` and `region` are moved here, whereas they are typically in `provider`
       */

      tenantUid: null,
      appUid: null,
      service: null,
      stage: null,
      region: null,
      deploymentUid: uuidv4(),

      // IF ARCHIVED... everything below this will be null
      archived: false,

      /*
       * App Data
       * - Provider, functions, subscriptions, resources, etc...
       * - Function-defaults in `provider` will be replicated across each function
       */

      provider: {
        type: 'awsLambda',
        awsLambda: {}
      },

      functions: {},
      subscriptions: {},
      resources: {},

      /*
       * Serverless.yml
       * - The raw serverless.yml, w/o populated variables (That introduces security concerns)
       * - This will be used for a "diff" view
       */

      yaml: {}
    }
  }

  /*
   * Get
   */

  get() {
    return this._
  }

  /*
   * Set Function
   */

  setFunction(data) {
    if (!data.name) {
      throw new Error('name is required')
    }

    const fn = {
      name: null,
      description: null,
      type: 'awsLambda',

      awsLambda: {
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

        layers: [],

        events: []
      }
    }

    this._.functions[data.name] = ramda.mergeDeepRight(fn, data)
    return this._.functions[data.name]
  }

  /*
   * Set Subscription
   */

  setSubscription() {}
}

module.exports = Deployment
