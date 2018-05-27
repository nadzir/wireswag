#!/usr/bin/env node
'use strict';

var _main = require('./main.js');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _cli = require('./cli');

var _ProxyServer = require('./ProxyServer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cli.setup)(_commander2.default);

if ((0, _cli.validateMandatoryInput)(_commander2.default)) {
  const { record, proxy, server, swagger, playback } = _commander2.default;

  if (record) {
    console.info(`Wireswag: Starting proxy : ${proxy}`);
    console.info(`Wireswag: Recording server : ${server}`);
    (0, _ProxyServer.startProxyServer)(server, proxy);
    console.info('Wireswag: Begin wiring swag...');
    (0, _main.start)(swagger, `localhost:${proxy}`);
  } else if (playback) {
    console.info(`Wireswag: Playing back server : ${server} on port : ${proxy}`);
    try {
      (0, _ProxyServer.startMockServer)(server, proxy);
    } catch (error) {
      console.error(error);
    }
  }
} else {
  console.error('Stopping due to errors.');
}