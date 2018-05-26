import { X_WIRESWAG_INPUT } from '../swagger/constants'

export const getInput = (param, wireSwagModel) => {
  const operationId = param[X_WIRESWAG_INPUT]

  const model = require(`../../wireswag-input/controllers/${wireSwagModel}.js`)
  const values = model[operationId]()

  return [].concat(values)
}
