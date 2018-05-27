import path from 'path'
export const getParams = (wireSwagModel, wireSwagInput) => {
//   const model = require(path.join(process.env.PWD, `../../wireswag-input/controllers/${wireSwagModel}.js`))
  const model = require(path.join(process.env.PWD, `wireswag-input/controllers/${wireSwagModel}.js`))
  const values = model[wireSwagInput]()

  return [].concat(values)
}
