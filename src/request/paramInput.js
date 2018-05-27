import { X_WIRESWAG_INPUT } from '../swagger/constants'
import path from 'path'

export const getInput = (param, wireSwagModel) => {
  const operationId = param[X_WIRESWAG_INPUT]

  const model = require(path.join(process.env.PWD, `../../wireswag-input/controllers/${wireSwagModel}.js`))
  const values = model[operationId]()

  return [].concat(values)
}
