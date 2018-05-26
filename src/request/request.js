import request from 'superagent'
import { getParamsValues } from '../request'

export const callEndpoint = (servername, endpoint) => {
  return new Promise(async (resolve, reject) => {
    const api = endpoint.api
    const method = endpoint.method
    const url = `${servername}${api}`
    const wireSwagModel = endpoint.wireSwagModel
    const params = endpoint.param

    // // All will be the same length
    const { queryParams, pathParams } = getParamsValues(params, wireSwagModel)

    // If parameter exists, then execute with each different values
    if (queryParams.length > 0) {
      const pCall = queryParams.map(async (queryParam, index) => {
        const pathParam = pathParams[index]
        return executeCallGet(url, method, queryParam, pathParam)
      })
      resolve(await Promise.all(pCall))
    } else {
      resolve(executeCallGet(url, method))
    }
  })
}

const executeCallGet = (url, method, query, path) => {
  const urlWithPathValue = path ? replaceUrlParam(url, path) : url
  return new Promise((resolve, reject) => {
    const req = request.get(urlWithPathValue)
    if (query) req.query(query)
    req.set('Accept', 'application/json')
    req.end((err, res) => {
      if (err) console.error()
      return resolve({
        url: urlWithPathValue,
        method,
        query,
        path,
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
