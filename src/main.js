import isEmpty from 'lodash/isEmpty'
import { getAllEndpoints } from './swagger'
import { callEndpoint } from './request'
import { mapSwaggerToRequest } from './mapping'

export const start = async (swaggerFile, servername) => {
  if (isEmpty(swaggerFile)) console.error('Swagger File is empty')
  if (isEmpty(servername)) console.error('Server Name is empty')

  const swaggerEndpoints = getAllEndpoints(swaggerFile)
  const parseEndpoints = mapSwaggerToRequest(swaggerEndpoints)

  // const res = await callEndpoint(servername, parseEndpoints[0][0])
  // console.log(res)
  const pCallEndpoints = []
  parseEndpoints.forEach((endpoint) => {
    // Each endpoint have multiple method
    endpoint.forEach(async (eachEndpointMethod) => {
      pCallEndpoints.push(callEndpoint(servername, eachEndpointMethod))
    })
  })

  const response = await Promise.all(pCallEndpoints)

  console.log('response', JSON.stringify(response, null, 2))
}
