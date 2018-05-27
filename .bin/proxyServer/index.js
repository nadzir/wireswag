'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startMockServer = exports.startProxyServer = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nineTrack = require('nine-track');

var _nineTrack2 = _interopRequireDefault(_nineTrack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startProxyServer = exports.startProxyServer = (server, proxy) => {
  try {
    (0, _express2.default)().use((0, _nineTrack2.default)({
      url: 'http://' + server,
      fixtureDir: _path2.default.join(process.env.PWD, 'directory/to/save/responses')
    })).listen(proxy);
  } catch (error) {
    console.error(error);
  }
};

const startMockServer = exports.startMockServer = (server, proxy) => {
  try {
    // try {
    //   express().use(function (req, res) {
    //     const response = {
    //       message: 'path was not recorded',
    //       path: req.path
    //     }
    //     res.json(response)
    //   }).listen(server.match(/(\d+)$/i)[0])
    // } catch (error) {
    //   console.error(error)
    // }

    (0, _express2.default)().use((0, _nineTrack2.default)({
      url: 'http://' + server,
      fixtureDir: _path2.default.join(process.env.PWD, 'directory/to/save/responses'),
      preventRecording: true
      // normalizeFn: function (info) {
      //   info.url = '/api/products/123'
      // }
    })).listen(proxy);
  } catch (error) {
    console.error(error);
  }
};