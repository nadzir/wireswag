'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _swagger = require('./swagger');

Object.keys(_swagger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swagger[key];
    }
  });
});