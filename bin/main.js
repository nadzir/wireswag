'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _swagger = require('./swagger');

var _request = require('./request');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const start = exports.start = (() => {
  var _ref = _asyncToGenerator(function* (swaggerFile, servername) {
    console.info(`Wireswag: Reading swagger file : ${swaggerFile}`);
    const endpoints = (0, _swagger.getEndpoints)(swaggerFile);
    const endpointsCount = Object.keys(endpoints).length;
    console.info(`Wireswag: Total endpoints captured : ${endpointsCount}`);

    const parsedEndpoints = (0, _swagger.parseEndpoints)(endpoints);
    const parsedEndpointsCount = Object.keys(parsedEndpoints).length;
    console.info(`Wireswag: Total api to be called: ${parsedEndpointsCount}`);

    const pCallEndpoints = parsedEndpoints.map((() => {
      var _ref2 = _asyncToGenerator(function* (endpoint) {
        return (0, _request.callEndpoint)(servername, endpoint);
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    })());
    const response = yield Promise.all(pCallEndpoints);
    console.log('response', JSON.stringify(response, null, 2));
  });

  return function start(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();