export const mapSwaggerToRequest = (swaggerPaths) => {
  return Object.keys(swaggerPaths).map(key => {
    const api = key
    const swaggerDetails = swaggerPaths[key]

    // Iterate through the methods
    return Object.keys(swaggerDetails).map(key => {
      const method = key
      const swaggerDetail = swaggerDetails[key]
      const param = swaggerDetail.parameters || []
      return {
        api,
        method,
        param
      }
    })
  })
}
