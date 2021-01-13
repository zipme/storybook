"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHtmlTag = isHtmlTag;

var _htmlTags = _interopRequireDefault(require("html-tags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isHtmlTag(tagName) {
  return _htmlTags.default.includes(tagName.toLowerCase());
}