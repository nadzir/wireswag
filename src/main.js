import isEmpty from 'lodash/isEmpty'
import { getAllEndpoints } from './swagger'

export const start = (swaggerFile, servername) => {
  if (isEmpty(swaggerFile)) console.error('Swagger File is empty')
  if (isEmpty(servername)) console.error('Server Name is empty')

  getAllEndpoints(swaggerFile)
}
