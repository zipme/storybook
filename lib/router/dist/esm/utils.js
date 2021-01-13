import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.search";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import qs from 'qs';
import memoize from 'memoizerific';
var splitPathRegex = /\/([^/]+)\/(?:(.*)_)?([^/]+)?/;
export var parsePath = memoize(1000)(function (path) {
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
export var queryFromString = memoize(1000)(function (s) {
  return qs.parse(s, {
    ignoreQueryPrefix: true
  });
});
export var queryFromLocation = function queryFromLocation(location) {
  return queryFromString(location.search);
};
export var stringifyQuery = function stringifyQuery(query) {
  return qs.stringify(query, {
    addQueryPrefix: true,
    encode: false
  });
};
export var getMatch = memoize(1000)(function (current, target) {
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