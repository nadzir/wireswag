'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callEndpoint = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _request = require('../request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const callEndpoint = exports.callEndpoint = (servername, endpoint) => {
  return new Promise((() => {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      const api = endpoint.api;
      const url = `${servername}${api}`;
      const wireSwagModel = endpoint.wireSwagModel;

      // Handle request
      const params = endpoint.param;

      // Get Path param
      // All will be the same length
      const { queryParams, pathParams } = (0, _request.getParamsValues)(params, wireSwagModel);

      const pCall = queryParams.map((() => {
        var _ref2 = _asyncToGenerator(function* (queryParam, index) {
          const pathParam = pathParams[index];
          return executeCallGet(url, queryParam, pathParam);
        });

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      })());

      const response = yield Promise.all(pCall);
      resolve({ url, response });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());
};

const executeCallGet = (url, query, path) => {
  const urlWithPathValue = replaceUrlParam(url, path);
  return new Promise((resolve, reject) => {
    const req = _superagent2.default.get(urlWithPathValue);

    if (query) req.query(query);

    req.set('Accept', 'application/json');
    req.end((err, res) => {
      if (err) console.error();
      // console.log(res)
      resolve({
        query,
        path: path,
        status: res.status
      });
    });
  });
};

const replaceUrlParam = (url, param) => {
  const paramName = Object.keys(param)[0];
  const paramValue = Object.values(param)[0];
  // if empty param
  if (!paramName || !paramValue) return url;

  // Replace {x} with values
  return url.replace(`{${paramName}}`, paramValue);
};