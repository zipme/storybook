"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = exports.extractTitle = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var extractTitle = function extractTitle(_ref) {
  var kind = _ref.kind,
      parameters = _ref.parameters;
  var groups = kind.split('/');
  return groups && groups[groups.length - 1] || kind;
};

exports.extractTitle = extractTitle;

var Title = function Title(_ref2) {
  var children = _ref2.children;
  var context = (0, _react.useContext)(_DocsContext.DocsContext);
  var text = children;

  if (!text) {
    text = extractTitle(context);
  }

  return text ? /*#__PURE__*/_react.default.createElement(_components.Title, {
    className: "sbdocs-title"
  }, text) : null;
};

exports.Title = Title;