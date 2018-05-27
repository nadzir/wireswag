import request from 'superagent'
import { getParams } from './params'

export const callEndpoint = (servername, endpoint) => {
  return new Promise(async (resolve, reject) => {
    const api = endpoint.api
    const method = endpoint.method
    const url = `${servername}${api}`
    const wireSwagModel = endpoint.wireSwagModel
    const wireSwagInput = endpoint.wireSwagInput

    // // All will be the same length
    const params = getParams(wireSwagModel, wireSwagInput)

    const pCall = params.map(async (param) => {
      const { query, path, body } = param
      return executeCallGet(url, method, query, path, body)
    })
    resolve(await Promise.all(pCall))
  })
}

const executeCallGet = (url, method, query, path, body) => {
  const urlWithPathValue = path ? replaceUrlParam(url, path) : url
  return new Promise((resolve, reject) => {
    const req = request.get(urlWithPathValue)
    if (query) req.query(query)
    req.set('Accept', 'application/json')
    req.end((err, res) => {
      if (err) return reject(err)
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

const replaceUrlParam = (url, paths) => {
  return Object.keys(paths).reduce((url, path) => {
    const paramName = path
    const paramValue = paths[path]
    // if empty param
    if (!paramName || !paramValue) return url
    // Replace {x} with values
    return url.replace(`{${paramName}}`, paramValue)
  }, url)
}
