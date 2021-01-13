"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meta = void 0;

var _react = _interopRequireWildcard(require("react"));

var _global = require("global");

var _Anchor = require("./Anchor");

var _DocsContext = require("./DocsContext");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getFirstStoryId(docsContext) {
  var stories = (0, _utils.getDocsStories)(docsContext);
  return stories.length > 0 ? stories[0].id : null;
}

function renderAnchor() {
  var context = (0, _react.useContext)(_DocsContext.DocsContext);
  var anchorId = getFirstStoryId(context) || context.id;
  return /*#__PURE__*/_react.default.createElement(_Anchor.Anchor, {
    storyId: anchorId
  });
}
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */


var Meta = function Meta() {
  var params = new URL(_global.document.location).searchParams;
  var isDocs = params.get('viewMode') === 'docs';
  return isDocs ? renderAnchor() : null;
};

exports.Meta = Meta;