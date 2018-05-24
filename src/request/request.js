import request from 'superagent'
import { getQueryParams } from '../request'

export const callEndpoint = (servername, endpoint) => {
  return new Promise((resolve, reject) => {
    const api = endpoint.api
    const url = `${servername}${api}`

    // Handle request
    const params = endpoint.param
    const queryParams = getQueryParams(params)
    const pCall = queryParams.map(async (queryParam) =>
      executeCallGet(url, queryParam)
    )
    return resolve(Promise.all(pCall))
  })
}

const executeCallGet = (url, query) => {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .query({ query })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.error(err)
        resolve({
          url,
          query,
          status: res.status
        })
      })
  })
}
