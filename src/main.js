import isEmpty from 'lodash/isEmpty'
export const start = (swaggerFile, servername) => {
  if (isEmpty(swaggerFile)) console.error('Swagger File is empty')
  if (isEmpty(servername)) console.error('Server Name is empty')

  console.log(start)
}
