'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _swagger = require('./swagger');

var _request = require('./request');

var _mapping = require('./mapping');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const start = exports.start = (() => {
  var _ref = _asyncToGenerator(function* (swaggerFile, servername) {
    if ((0, _isEmpty2.default)(swaggerFile)) console.error('Swagger File is empty');
    if ((0, _isEmpty2.default)(servername)) console.error('Server Name is empty');

    const swaggerEndpoints = (0, _swagger.getAllEndpoints)(swaggerFile);
    const parseEndpoints = (0, _mapping.mapSwaggerToRequest)(swaggerEndpoints);

    const pCallEndpoints = [];
    parseEndpoints.forEach(function (endpoint) {
      // Each endpoint have multiple method
      endpoint.forEach((() => {
        var _ref2 = _asyncToGenerator(function* (eachEndpointMethod) {
          pCallEndpoints.push((0, _request.callEndpoint)(servername, eachEndpointMethod));
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      })());
    });

    const response = yield Promise.all(pCallEndpoints);
    console.log('response', JSON.stringify(response, null, 2));
  });

  return function start(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();