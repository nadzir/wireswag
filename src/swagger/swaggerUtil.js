const yaml = require('js-yaml')
const fs = require('fs')

export const getAllEndpoints = (swaggerFile) => {
  try {
    var swaggerDoc = yaml.safeLoad(fs.readFileSync(swaggerFile, 'utf8'))
    return swaggerDoc.paths
  } catch (err) {
    console.error(err)
  }
}
