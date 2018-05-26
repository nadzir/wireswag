'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _swaggerToRequest = require('./swaggerToRequest')

Object.keys(_swaggerToRequest).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swaggerToRequest[key]
    }
  })
})
