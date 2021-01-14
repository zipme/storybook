"use strict";

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyQueryParams = void 0;

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringifyQueryParams = function stringifyQueryParams(queryParams) {
  return _qs.default.stringify(queryParams, {
    addQueryPrefix: true,
    encode: true
  }).replace(/^\?/, '&');
};

exports.stringifyQueryParams = stringifyQueryParams;