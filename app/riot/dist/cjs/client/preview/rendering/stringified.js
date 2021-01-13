"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderStringified;

var riot = _interopRequireWildcard(require("riot"));

var _riotCompiler = _interopRequireDefault(require("riot-compiler"));

var _global = require("global");

var _compileStageFunctions = require("../compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function guessRootName(stringified) {
  var whiteSpaceLocation = stringified.indexOf(' ', stringified.indexOf('<') + 1);
  var firstWhitespace = whiteSpaceLocation === -1 ? stringified.length : whiteSpaceLocation;
  var supposedName = stringified.trim().match(/^<[^ >]+\/>$/) ? stringified.trim().replace(/[<>/]/g, '') : stringified.substring(stringified.indexOf('<') + 1, Math.min(firstWhitespace, stringified.indexOf('>')));

  var matchingBuiltInTag = _global.document.createElement(supposedName).constructor.name;

  return matchingBuiltInTag === 'HTMLUnknownElement' ? supposedName : 'root';
}

function compileText(code, rootName) {
  var sourceCodeEndOfHtml = (Math.min(code.indexOf('<style') + 1, code.indexOf('<script') + 1) || code.length + 1) - 1;
  var sourceCodeReformatted = code.substring(0, sourceCodeEndOfHtml).replace(/[\n\r\s]+/g, ' ') + code.substring(sourceCodeEndOfHtml);
  var sourceCode = rootName === 'root' ? "<root>".concat(sourceCodeReformatted, "</root>") : sourceCodeReformatted;
  return _riotCompiler.default.compile(sourceCode, {}).replace(_compileStageFunctions.alreadyCompiledMarker, '').trim();
}

function renderStringified(_ref) {
  var tags = _ref.tags,
      _ref$template = _ref.template,
      template = _ref$template === void 0 ? "<".concat((tags[0] || []).boundAs || guessRootName(tags[0] || ''), "/>") : _ref$template,
      tagConstructor = _ref.tagConstructor;
  var tag2 = riot.tag2;
  tags.forEach(function (input) {
    var oneTag = input || {};
    var rootName = oneTag.boundAs || guessRootName(oneTag);
    var content = oneTag.content;
    var code = content ? content.trim() : input || '';
    var compiled = code.includes(_compileStageFunctions.alreadyCompiledMarker) ? code : compileText(code, rootName);
    (0, riot.unregister)(rootName);
    eval((0, _compileStageFunctions.getRidOfRiotNoise)("".concat(compiled))); // eslint-disable-line no-eval
  });

  var sourceCode = _riotCompiler.default.compile("<root>".concat(template, "</root>"), {});

  var final;

  if (tagConstructor) {
    final = (0, _compileStageFunctions.setConstructor)(sourceCode, tagConstructor);
  } else {
    final = sourceCode;
  }

  if (template !== '<root/>') {
    eval((0, _compileStageFunctions.getRidOfRiotNoise)(final)); // eslint-disable-line no-eval
  }

  (0, riot.mount)('*');
}