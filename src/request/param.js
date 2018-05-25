import { PARAM, getInput } from '../request'

export const getParamsValues = (params, wireSwagModel) => {
  // Get all the various methods in arrays
  const queryParams = getParamsFromMethod(params, wireSwagModel, PARAM.QUERY)
  const pathParams = getParamsFromMethod(params, wireSwagModel, PARAM.PATH)

  // Determine the longest arrays
  const longestArrayLength = findLongestArray(queryParams, pathParams)
  // Padd arrays with extra values
  const queryParamsPadded = padArray(queryParams, longestArrayLength)
  const pathParamsPadded = padArray(pathParams, longestArrayLength)

  return {
    queryParams: queryParamsPadded,
    pathParams: pathParamsPadded
  }
}

const getParamsFromMethod = (params, wireSwagModel, method) => {
  // Arr to return
  const queryArr = []
  params
  // Filter query param
    .filter(param => param.in === method)
    .forEach(param => {
      // Get the param values
      const values = getInput(param, wireSwagModel)
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

const findLongestArray = (arr1, arr2) => {
  if (arr1.length > arr2.length) return arr1.length
  else return arr2.length
}

const padArray = (arr, length) => {
  if (arr.length < length) {
    const lengthDiff = length - arr.length
    return arr.concat(Array(lengthDiff).fill(null))
  }
  return arr
}
