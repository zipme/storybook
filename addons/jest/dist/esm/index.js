import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.values";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.match";
import addons from '@storybook/addons';
import { normalize, sep } from 'upath';
import { ADD_TESTS } from './shared';

var findTestResults = function findTestResults(testFiles, jestTestResults, jestTestFilesExt) {
  return Object.values(testFiles).map(function (name) {
    var fileName = "".concat(sep).concat(name).concat(jestTestFilesExt);

    if (jestTestResults && jestTestResults.testResults) {
      var fileNamePattern = new RegExp(fileName);
      return {
        fileName: fileName,
        name: name,
        result: jestTestResults.testResults.find(function (test) {
          return Boolean(normalize(test.name).match(fileNamePattern));
        })
      };
    }

    return {
      fileName: fileName,
      name: name
    };
  });
};

var emitAddTests = function emitAddTests(_ref) {
  var kind = _ref.kind,
      story = _ref.story,
      testFiles = _ref.testFiles,
      options = _ref.options;
  addons.getChannel().emit(ADD_TESTS, {
    kind: kind,
    storyName: story,
    tests: findTestResults(testFiles, options.results, options.filesExt)
  });
};

export var withTests = function withTests(userOptions) {
  var defaultOptions = {
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.[jt]sx?)?$'
  };
  var options = Object.assign({}, defaultOptions, userOptions);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var storyFn = args[0],
        _args$ = args[1],
        kind = _args$.kind,
        _args$$parameters = _args$.parameters,
        parameters = _args$$parameters === void 0 ? {} : _args$$parameters;
    var testFiles = parameters.jest;

    if (typeof testFiles === 'string') {
      testFiles = [testFiles];
    }

    if (testFiles && Array.isArray(testFiles)) {
      emitAddTests({
        kind: kind,
        story: storyFn,
        testFiles: testFiles,
        options: options
      });
    }

    return storyFn();
  };
};

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}