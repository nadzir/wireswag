yaml = require('js-yaml');
fs   = require('fs');

// Read from yml files
// Get document, or throw exception on error
try {
  var swaggerDoc = yaml.safeLoad(fs.readFileSync('./samples/swagger.yml', 'utf8'));
  console.log(swaggerDoc);
} catch (e) {
  console.log(e);
}