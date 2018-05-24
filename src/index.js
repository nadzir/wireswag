
const isEmpty = require('lodash/isEmpty')
const yaml = require('js-yaml')
const fs = require('fs')
const request = require('superagent')

const swaggerFile = './samples/swagger.yml'
const serverHost = 'localhost:4000'

/**
 * returns an object with 4 arrays
 * {
 *  gets : endpoint with get method
 *  puts : endpoint with put method
 *  deletes : endpoint with delete method
 *  puts : endpoint with puts method
 * }
 */
const getEndpoints = () => {
  // Read from yml files
  // Get document, or throw exception on error
  try {
    var swaggerDoc = yaml.safeLoad(fs.readFileSync(swaggerFile, 'utf8'))
    const paths = swaggerDoc.paths

    const gets = []
    const posts = []
    const deletes = []
    const puts = []

    // Iterate though each end points
    Object.keys(paths).forEach((key) => {
      const endpoint = paths[key]

      // Iterate through each method
      Object.keys(endpoint).forEach((method) => {
        const api = {}
        api[key] = endpoint[method].parameters
        if (method === 'get') gets.push(api)
        else if (method === 'post') posts.push(api)
        else if (method === 'delete') deletes.push(api)
        else if (method === 'put') puts.push(api)
      })
    }, [])

    return {
      gets,
      posts,
      deletes,
      puts
    }
  } catch (e) {
    console.error(e)
  }
}
/**
 * returns an array of object {api,variables}
 * @param  {gets, posts, deletes, puts} endpoints
 */
const addVariable = (endpoints) => {
  return Object.values(endpoints).map(endpoint => {
    const apis = endpoint
    return apis.map(api => {
      const variables = {}

      // Get all variables inside curly brackets
      const regex = /{([^}]+)}/g
      let match = regex.exec(api)
      while (match) {
        variables[match[1]] = 'Input value'
        match = regex.exec(api)
      }

      if (isEmpty(variables)) return {api}
      return {api, variables}
    })
  })
}

const writeFile = (content) => {
  fs.writeFileSync('./output/variable.json', content)
}

const executeCurl = (endpoint) => {
  console.log(`${serverHost}${endpoint}`)
  api = endpoint
  request
    .get(`${serverHost}${endpoint}`)
    // .query({ action: 'edit', city: 'London' }) // query string
    .end((err, res) => {
      if (err) console.error(err)
      console.log(res.status)
    })
}

const endpoints = getEndpoints()
// Get only GET endpoints
const getEndPoints = endpoints.gets
// Get only Alias for testing
const testingEndpoint = getEndPoints[0]
console.log(JSON.stringify(testingEndpoint))

// Create curl command
executeCurl(testingEndpoint)
// const endpointsWithVariable = addVariable(endpoints)
// const output = JSON.stringify(endpointsWithVariable, null, 2)
// writeFile(output)
