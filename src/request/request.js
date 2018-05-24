import request from 'superagent'

export const callEndpoint = (servername, endpoint) => {
  return new Promise((resolve, reject) => {
    const api = endpoint.api

    request
      .get(`${servername}${api}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.error('error')
        resolve({
          url: `${servername}${api}`,
          status: res.status
        })
      })
  })
}
