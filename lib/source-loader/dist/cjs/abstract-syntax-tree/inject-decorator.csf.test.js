"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _injectDecorator = _interopRequireDefault(require("./inject-decorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('inject-decorator', function () {
  describe('positive - ts - csf', function () {
    it('includes storySource parameter in the default exported object', function () {
      var mockFilePath = './__mocks__/inject-decorator.ts.csf.txt';

      var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

      var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
        parser: 'typescript'
      });
      expect(result.source).toMatchSnapshot();
      expect(result.source).toEqual(expect.stringContaining('export default {parameters: {"storySource":{"source":"import React from'));
    });
  });
  describe('injectStoryParameters - ts - csf', function () {
    it('includes storySource parameter in the default exported object', function () {
      var mockFilePath = './__mocks__/inject-parameters.ts.csf.txt';

      var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

      var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
        injectStoryParameters: true,
        parser: 'typescript'
      });
      expect(result.source).toMatchSnapshot();
    });
  });
});