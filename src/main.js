import isEmpty from 'lodash/isEmpty'
import { getAllEndpoints } from './swagger'
import { callEndpoint } from './request'
import { mapSwaggerToRequest } from './mapping'

export const start = async (swaggerFile, servername) => {
  if (isEmpty(swaggerFile)) console.error('Swagger File is empty')
  if (isEmpty(servername)) console.error('Server Name is empty')

  const swaggerEndpoints = getAllEndpoints(swaggerFile)
  const parseEndpoints = mapSwaggerToRequest(swaggerEndpoints)
  const pCallEndpoints = parseEndpoints.map(async (endpoint) =>
    callEndpoint(servername, endpoint[0])
  )
  const response = await Promise.all(pCallEndpoints)
  console.log('response', response)
}
