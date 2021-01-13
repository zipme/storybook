"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _injectDecorator = _interopRequireDefault(require("./inject-decorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('inject-decorator', function () {
  describe('positive', function () {
    var mockFilePath = './__mocks__/inject-decorator.stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'javascript'
    });
    it('returns "changed" flag', function () {
      expect(result.changed).toBeTruthy();
    });
    it('injects stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
    it('calculates "adds" map', function () {
      expect(result.addsMap).toMatchSnapshot();
    });
  });
  describe('positive - angular', function () {
    var mockFilePath = './__mocks__/inject-decorator.angular-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'typescript'
    });
    it('returns "changed" flag', function () {
      expect(result.changed).toBeTruthy();
    });
    it('injects stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
    it('calculates "adds" map', function () {
      expect(result.addsMap).toMatchSnapshot();
    });
  });
  describe('positive - flow', function () {
    var mockFilePath = './__mocks__/inject-decorator.flow-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'flow'
    });
    it('returns "changed" flag', function () {
      expect(result.changed).toBeTruthy();
    });
    it('injects stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
    it('calculates "adds" map', function () {
      expect(result.addsMap).toMatchSnapshot();
    });
  });
  describe('positive - ts', function () {
    var mockFilePath = './__mocks__/inject-decorator.ts.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'typescript'
    });
    it('returns "changed" flag', function () {
      expect(result.changed).toBeTruthy();
    });
    it('injects stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
    it('calculates "adds" map', function () {
      expect(result.addsMap).toMatchSnapshot();
    });
  });
  describe('stories with ugly comments', function () {
    var mockFilePath = './__mocks__/inject-decorator.ugly-comments-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'javascript'
    });
    it('should delete ugly comments from the generated story source', function () {
      expect(result.storySource).toMatchSnapshot();
    });
  });
  describe('stories with ugly comments in ts', function () {
    var mockFilePath = './__mocks__/inject-decorator.ts.ugly-comments-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      parser: 'typescript'
    });
    it('should delete ugly comments from the generated story source', function () {
      expect(result.storySource).toMatchSnapshot();
    });
  });
  it('will not change the source when there are no "storiesOf" functions', function () {
    var mockFilePath = './__mocks__/inject-decorator.no-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath));
    expect(result.changed).toBeFalsy();
    expect(result.addsMap).toEqual({});
    expect(result.source).toMatchSnapshot();
  });
  describe('injectDecorator option is false', function () {
    var mockFilePath = './__mocks__/inject-decorator.stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      injectDecorator: false,
      parser: 'javascript'
    });
    it('does not inject stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
  });
  describe('injectDecorator option is false - angular', function () {
    var mockFilePath = './__mocks__/inject-decorator.angular-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      injectDecorator: false,
      parser: 'typescript'
    });
    it('does not inject stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
  });
  describe('injectDecorator option is false - flow', function () {
    var mockFilePath = './__mocks__/inject-decorator.flow-stories.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      injectDecorator: false,
      parser: 'flow'
    });
    it('does not inject stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
  });
  describe('injectDecorator option is false - ts', function () {
    var mockFilePath = './__mocks__/inject-decorator.ts.txt';

    var source = _fs.default.readFileSync(mockFilePath, 'utf-8');

    var result = (0, _injectDecorator.default)(source, _path.default.resolve(__dirname, mockFilePath), {
      injectDecorator: false,
      parser: 'typescript'
    });
    it('does not inject stories decorator after the all "storiesOf" functions', function () {
      expect(result.source).toMatchSnapshot();
    });
  });
});