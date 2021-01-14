"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatch = exports.stringifyQuery = exports.queryFromLocation = exports.queryFromString = exports.parsePath = void 0;

var _qs = _interopRequireDefault(require("qs"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitPathRegex = /\/([^/]+)\/(?:(.*)_)?([^/]+)?/;
var parsePath = (0, _memoizerific.default)(1000)(function (path) {
  var result = {
    viewMode: undefined,
    storyId: undefined,
    refId: undefined
  };

  if (path) {
    var _ref = path.toLowerCase().match(splitPathRegex) || [],
        _ref2 = _slicedToArray(_ref, 4),
        viewMode = _ref2[1],
        refId = _ref2[2],
        storyId = _ref2[3];

    if (viewMode) {
      Object.assign(result, {
        viewMode: viewMode,
        storyId: storyId,
        refId: refId
      });
    }
  }

  return result;
});
exports.parsePath = parsePath;
var queryFromString = (0, _memoizerific.default)(1000)(function (s) {
  return _qs.default.parse(s, {
    ignoreQueryPrefix: true
  });
});
exports.queryFromString = queryFromString;

var queryFromLocation = function queryFromLocation(location) {
  return queryFromString(location.search);
};

exports.queryFromLocation = queryFromLocation;

var stringifyQuery = function stringifyQuery(query) {
  return _qs.default.stringify(query, {
    addQueryPrefix: true,
    encode: false
  });
};

exports.stringifyQuery = stringifyQuery;
var getMatch = (0, _memoizerific.default)(1000)(function (current, target) {
  var startsWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var startsWithTarget = current && startsWith && current.startsWith(target);
  var currentIsTarget = typeof target === 'string' && current === target;
  var matchTarget = current && target && current.match(target);

  if (startsWithTarget || currentIsTarget || matchTarget) {
    return {
      path: current
    };
  }

  return null;
});
exports.getMatch = getMatch;