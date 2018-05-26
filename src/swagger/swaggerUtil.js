const yaml = require('js-yaml')
const fs = require('fs')

export const getAllEndpoints = (swaggerFile) => {
  try {
    const file = fs.readFileSync(swaggerFile, 'utf8')
    var swaggerDoc = yaml.safeLoad(file)
    return swaggerDoc.paths
  } catch (err) {
    console.error(err)
  }
}
