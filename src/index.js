
const isEmpty = require('lodash/isEmpty')
const yaml = require('js-yaml')
const fs = require('fs')

const swaggerFile = './samples/swagger.yml'

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
      const path = key

      // Iterate through each method
      Object.keys(endpoint).forEach((method) => {
        if (method === 'get') gets.push(path)
        else if (method === 'post') posts.push(path)
        else if (method === 'delete') deletes.push(path)
        else if (method === 'put') puts.push(path)
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

const endpoints = getEndpoints()
const endpointsWithVariable = addVariable(endpoints)
console.log(JSON.stringify(endpointsWithVariable, null, 2))
