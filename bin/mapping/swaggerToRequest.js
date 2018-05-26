'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mapSwaggerToRequest = undefined

var _constants = require('../request/constants')

var _constants2 = require('./constants')

const mapSwaggerToRequest = exports.mapSwaggerToRequest = swaggerPaths => {
  return Object.keys(swaggerPaths).map(key => {
    const api = key
    const swaggerDetails = swaggerPaths[key]

    // Get the model
    const wireSwagModel = swaggerDetails[_constants2.X_WIRESWAG_MODEL]
    if (!wireSwagModel) {
      console.warn(`${_constants2.X_WIRESWAG_MODEL} is missing for ${api}`)
      return []
    }

    // Iterate through the methods
    return Object.keys(swaggerDetails).map(key => {
      const method = key
      if (invalidMethod(method)) return null

      const swaggerDetail = swaggerDetails[key]
      const param = swaggerDetail.parameters || []
      return {
        api,
        method,
        param,
        wireSwagModel
      }
    }).filter(key => key)
  })
}

const invalidMethod = method => ![_constants.METHOD.GET, _constants.METHOD.POST].includes(method)
