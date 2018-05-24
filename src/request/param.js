import { PARAM, getInput } from '../request'

export const getQueryParams = (params) => {
  // Arr to return
  const queryArr = []

  params
  // Filter query param
    .filter(param => param.in === PARAM.QUERY)
    .forEach(param => {
      // Get the param values
      const values = getInput(param)
      // Insert into arr for each values
      values.forEach(value => {
        const query = {}
        // Get the param name
        const name = param.name
        // Pump the value
        query[name] = value
        // Insert into arr
        queryArr.push(query)
      })
    })
  return queryArr
}
