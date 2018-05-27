'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callEndpoint = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _params = require('./params');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const callEndpoint = exports.callEndpoint = (servername, endpoint) => {
  return new Promise((() => {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      const api = endpoint.api;
      const method = endpoint.method;
      const url = `${servername}${api}`;
      const wireSwagModel = endpoint.wireSwagModel;
      const wireSwagInput = endpoint.wireSwagInput;

      // // All will be the same length
      const params = (0, _params.getParams)(wireSwagModel, wireSwagInput);

      const pCall = params.map((() => {
        var _ref2 = _asyncToGenerator(function* (param) {
          const { query, path, body } = param;
          return executeCallGet(url, method, query, path, body);
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      })());
      resolve((yield Promise.all(pCall)));
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());
};

const executeCallGet = (url, method, query, path, body) => {
  const urlWithPathValue = path ? replaceUrlParam(url, path) : url;
  console.log(urlWithPathValue);
  return new Promise((resolve, reject) => {
    const req = _superagent2.default.get(urlWithPathValue);
    if (query) req.query(query);
    req.set('Accept', 'application/json');
    req.end((err, res) => {
      if (err) return reject(err);
      return resolve({
        url: urlWithPathValue,
        method,
        query,
        path,
        status: res.status
      });
    });
  });
};

const replaceUrlParam = (url, paths) => {
  return Object.keys(paths).reduce((url, path) => {
    const paramName = path;
    const paramValue = paths[path];
    // if empty param
    if (!paramName || !paramValue) return url;
    // Replace {x} with values
    return url.replace(`{${paramName}}`, paramValue);
  }, url);
};