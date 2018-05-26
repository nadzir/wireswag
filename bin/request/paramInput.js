'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInput = undefined;

var _constants = require('../mapping/constants');

const getInput = exports.getInput = (param, wireSwagModel) => {
  const operationId = param[_constants.X_WIRESWAG_INPUT];

  const model = require(`../../wireswag-input/controllers/${wireSwagModel}.js`);
  const values = model[operationId]();

  return [].concat(values);
};