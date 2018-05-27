#!/usr/bin/env node
'use strict';

var _main = require('./main.js');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _cli = require('./cli');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cli.setup)(_commander2.default);

if ((0, _cli.validateMandatoryInput)(_commander2.default)) {
  console.info('Wireswag: Begin wiring swag...');
  (0, _main.start)(_commander2.default.swagger, _commander2.default.server);
} else {
  console.error('Stopping due to errors.');
}