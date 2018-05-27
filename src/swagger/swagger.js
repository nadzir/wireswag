import { METHOD } from '../request'
import { X_WIRESWAG_MODEL, X_WIRESWAG_INPUT } from './constants'

const yaml = require('js-yaml')
const fs = require('fs')

export const getEndpoints = (swaggerFile) => {
  try {
    const file = fs.readFileSync(swaggerFile, 'utf8')
    var swaggerDoc = yaml.safeLoad(file)
    return swaggerDoc.paths || {}
  } catch (err) {
    console.error(err)
  }
}

export const parseEndpoints = (endpoints) => {
  const endpointsArr = []
  Object.keys(endpoints).forEach(endpoint => {
    // endPoint info contains all the various methods. eg GET POST
    const endpointInfo = endpoints[endpoint]

    // Get the wire-swag-model
    const wireSwagModel = endpointInfo[X_WIRESWAG_MODEL] || null

    // If wireSwagModel is null then ignore
    if (!wireSwagModel) {
      console.warn(`Wireswag-warn: ${endpoint} has no ${X_WIRESWAG_MODEL} specified`)
      return
    }

    // Iterate through each endpoint
    Object.keys(endpointInfo).forEach(method => {
      if (invalidMethod(method)) return null

      const info = endpointInfo[method]
      const param = info.parameters || []

      // Get the wire-swag-operationId
      const wireSwagInput = info[X_WIRESWAG_INPUT] || method

      // Add into array
      endpointsArr.push({
        api: endpoint,
        method,
        wireSwagModel,
        wireSwagInput,
        param
      })
    })
  })

  return endpointsArr
}

const invalidMethod = (method) => !([METHOD.GET, METHOD.POST].includes(method))
