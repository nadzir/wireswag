import request from 'superagent'
import { getParamsValues } from '../request'

export const callEndpoint = (servername, endpoint) => {
  return new Promise(async (resolve, reject) => {
    const api = endpoint.api
    const url = `${servername}${api}`
    const wireSwagModel = endpoint.wireSwagModel

    // Handle request
    const params = endpoint.param

    // Get Path param
    // All will be the same length
    const { queryParams, pathParams } = getParamsValues(params, wireSwagModel)

    const pCall = queryParams.map(async (queryParam, index) => {
      const pathParam = pathParams[index]
      return executeCallGet(url, queryParam, pathParam)
    })

    const response = await Promise.all(pCall)
    resolve({url, response})
  })
}

const executeCallGet = (url, query, path) => {
  const urlWithPathValue = replaceUrlParam(url, path)
  return new Promise((resolve, reject) => {
    const req = request.get(urlWithPathValue)

    if (query) req.query(query)

    req.set('Accept', 'application/json')
    req.end((err, res) => {
      if (err) console.error()
      // console.log(res)
      resolve({
        query,
        path: path,
        status: res.status
      })
    })
  })
}

const replaceUrlParam = (url, param) => {
  const paramName = Object.keys(param)[0]
  const paramValue = Object.values(param)[0]
  // if empty param
  if (!paramName || !paramValue) return url

  // Replace {x} with values
  return url.replace(`{${paramName}}`, paramValue)
}
