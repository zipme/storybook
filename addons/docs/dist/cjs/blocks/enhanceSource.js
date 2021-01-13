"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceSource = void 0;

var _clientApi = require("@storybook/client-api");

var _extractSource = require("@storybook/source-loader/extract-source");

/**
 * Replaces full story id name like: story-kind--story-name -> story-name
 * @param id
 */
var storyIdToSanitizedStoryName = function storyIdToSanitizedStoryName(id) {
  return id.replace(/^.*?--/, '');
};

var extract = function extract(targetId, _ref) {
  var source = _ref.source,
      locationsMap = _ref.locationsMap;

  if (!locationsMap) {
    return source;
  }

  var sanitizedStoryName = storyIdToSanitizedStoryName(targetId);
  var location = locationsMap[sanitizedStoryName];
  var lines = source.split('\n');
  return (0, _extractSource.extractSource)(location, lines);
};

var enhanceSource = function enhanceSource(context) {
  var _docs$source;

  var id = context.id,
      parameters = context.parameters;
  var storySource = parameters.storySource,
      _parameters$docs = parameters.docs,
      docs = _parameters$docs === void 0 ? {} : _parameters$docs;
  var transformSource = docs.transformSource; // no input or user has manually overridden the output

  if (!(storySource !== null && storySource !== void 0 && storySource.source) || (_docs$source = docs.source) !== null && _docs$source !== void 0 && _docs$source.code) {
    return null;
  }

  var input = extract(id, storySource);
  var code = transformSource ? transformSource(input, context) : input;
  return {
    docs: (0, _clientApi.combineParameters)(docs, {
      source: {
        code: code
      }
    })
  };
};

exports.enhanceSource = enhanceSource;