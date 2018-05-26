'use strict';

var _swagger = require('./swagger');

describe('swagger', () => {
  describe('parseEndpoints', () => {
    it('should return empty array if input is empty object', () => {
      const input = {};
      const output = (0, _swagger.parseEndpoints)(input);
      expect(output).toEqual([]);
    });

    it('should return valid array', () => {
      const input = {
        '/car/{id}': {
          'x-wireswag-model': 'Car',
          get: {
            parameters: 'param'
          },
          post: {
            parameters: 'post'
          },
          ignoreOtherMethod: {
            parameters: 'ignore'
          }
        }
      };
      const expectedOutput = [{
        'endpoint': '/car/{id}',
        'method': 'get',
        'param': 'param',
        'wireSwagModel': 'Car'
      }, {
        'endpoint': '/car/{id}',
        'method': 'post',
        'param': 'post',
        'wireSwagModel': 'Car'
      }];
      const output = (0, _swagger.parseEndpoints)(input);
      expect(output).toEqual(expectedOutput);
    });
  });
});