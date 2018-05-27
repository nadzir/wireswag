'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEndpoints = exports.getEndpoints = undefined;

var _request = require('../request');

var _constants = require('./constants');

const yaml = require('js-yaml');
const fs = require('fs');

const getEndpoints = exports.getEndpoints = swaggerFile => {
  try {
    const file = fs.readFileSync(swaggerFile, 'utf8');
    var swaggerDoc = yaml.safeLoad(file);
    return swaggerDoc.paths || {};
  } catch (err) {
    console.error(err);
  }
};

const parseEndpoints = exports.parseEndpoints = endpoints => {
  const endpointsArr = [];
  Object.keys(endpoints).forEach(endpoint => {
    // endPoint info contains all the various methods. eg GET POST
    const endpointInfo = endpoints[endpoint];

    // Get the wire-swag-model
    const wireSwagModel = endpointInfo[_constants.X_WIRESWAG_MODEL] || null;

    // If wireSwagModel is null then ignore
    if (!wireSwagModel) {
      console.warn(`Wireswag-warn: ${endpoint} has no ${_constants.X_WIRESWAG_MODEL} specified`);
      return;
    }

    // Iterate through each endpoint
    Object.keys(endpointInfo).forEach(method => {
      if (invalidMethod(method)) return null;

      const info = endpointInfo[method];
      const param = info.parameters || [];

      // Get the wire-swag-operationId
      const wireSwagInput = info[_constants.X_WIRESWAG_INPUT] || method;

      // Add into array
      endpointsArr.push({
        api: endpoint,
        method,
        wireSwagModel,
        wireSwagInput,
        param
      });
    });
  });

  return endpointsArr;
};

const invalidMethod = method => ![_request.METHOD.GET, _request.METHOD.POST].includes(method);