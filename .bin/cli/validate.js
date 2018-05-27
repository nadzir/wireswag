'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const validateMandatoryInput = exports.validateMandatoryInput = program => {
  if (!program.swagger) {
    console.warn('please specify a swagger file');
    return false;
  }
  if (!program.server) {
    console.warn('please specify a servername');
    return false;
  }
  return true;
};