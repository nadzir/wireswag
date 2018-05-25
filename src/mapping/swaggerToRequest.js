import {METHOD} from '../request/constants'
import { X_WIRESWAG_MODEL } from './constants'

export const mapSwaggerToRequest = (swaggerPaths) => {
  return Object.keys(swaggerPaths).map(key => {
    const api = key
    const swaggerDetails = swaggerPaths[key]

    // Get the model
    const wireSwagModel = swaggerDetails[X_WIRESWAG_MODEL]
    if (!wireSwagModel) {
      console.warn(`${X_WIRESWAG_MODEL} is missing for ${api}`)
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

const invalidMethod = (method) => !([METHOD.GET, METHOD.POST].includes(method))
