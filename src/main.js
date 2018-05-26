import { getEndpoints, parseEndpoints } from './swagger'
import { callEndpoint } from './request'

export const start = async (swaggerFile, servername) => {
  console.info(`Wireswag: Reading swagger file : ${swaggerFile}`)
  const endpoints = getEndpoints(swaggerFile)
  const endpointsCount = Object.keys(endpoints).length
  console.info(`Wireswag: Total endpoints captured : ${endpointsCount}`)

  const parsedEndpoints = parseEndpoints(endpoints)
  const parsedEndpointsCount = Object.keys(parsedEndpoints).length
  console.info(`Wireswag: Total api to be called: ${parsedEndpointsCount}`)

  const pCallEndpoints = parsedEndpoints.map(async (endpoint) => callEndpoint(servername, endpoint))
  const response = await Promise.all(pCallEndpoints)
  console.log('response', JSON.stringify(response, null, 2))
}
