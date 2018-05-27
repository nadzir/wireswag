'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParams = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getParams = exports.getParams = (wireSwagModel, wireSwagInput) => {
  //   const model = require(path.join(process.env.PWD, `../../wireswag-input/controllers/${wireSwagModel}.js`))
  const model = require(_path2.default.join(process.env.PWD, `wireswag-input/controllers/${wireSwagModel}.js`));
  const values = model[wireSwagInput]();

  return [].concat(values);
};