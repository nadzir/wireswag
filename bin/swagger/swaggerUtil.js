'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const yaml = require('js-yaml');
const fs = require('fs');

const getAllEndpoints = exports.getAllEndpoints = swaggerFile => {
  try {
    const file = fs.readFileSync(swaggerFile, 'utf8');
    var swaggerDoc = yaml.safeLoad(file);
    return swaggerDoc.paths;
  } catch (err) {
    console.error(err);
  }
};