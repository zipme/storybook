import fs from 'fs';
import path from 'path';
import injectDecorator from './inject-decorator';
describe('inject-decorator', function () {
  describe('positive - ts - csf', function () {
    it('includes storySource parameter in the default exported object', function () {
      var mockFilePath = './__mocks__/inject-decorator.ts.csf.txt';
      var source = fs.readFileSync(mockFilePath, 'utf-8');
      var result = injectDecorator(source, path.resolve(__dirname, mockFilePath), {
        parser: 'typescript'
      });
      expect(result.source).toMatchSnapshot();
      expect(result.source).toEqual(expect.stringContaining('export default {parameters: {"storySource":{"source":"import React from'));
    });
  });
  describe('injectStoryParameters - ts - csf', function () {
    it('includes storySource parameter in the default exported object', function () {
      var mockFilePath = './__mocks__/inject-parameters.ts.csf.txt';
      var source = fs.readFileSync(mockFilePath, 'utf-8');
      var result = injectDecorator(source, path.resolve(__dirname, mockFilePath), {
        injectStoryParameters: true,
        parser: 'typescript'
      });
      expect(result.source).toMatchSnapshot();
    });
  });
});