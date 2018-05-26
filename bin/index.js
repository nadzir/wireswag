#!/usr/bin/env node
'use strict';

var _main = require('./main.js');

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('1.0.0').option('-s, --swagger [file]', 'swagger files').option('-g, --server [servername]', 'servername').option('-w, --wiremock', 'wiremock').parse(process.argv);

if (!_commander2.default.swagger) console.warn('please specify a swagger file');else if (!_commander2.default.server) console.warn('please specify a servername');else {
  (0, _main.start)(_commander2.default.swagger, _commander2.default.server);
}