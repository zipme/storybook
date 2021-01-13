import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { Fragment, memo } from 'react';
import { useAddonState, useChannel } from '@storybook/api';
import { ActionBar } from '@storybook/components';
import { ADDON_ID, EVENTS } from './constants';
var Content = /*#__PURE__*/memo(function (_ref) {
  var results = _ref.results;
  return /*#__PURE__*/React.createElement(Fragment, null, results.length ? /*#__PURE__*/React.createElement("ol", null, results.map(function (i, index) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("li", {
        key: index
      }, i)
    );
  })) : null);
});
export var Panel = function Panel() {
  var _useAddonState = useAddonState(ADDON_ID, []),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      results = _useAddonState2[0],
      setState = _useAddonState2[1];

  var emit = useChannel(_defineProperty({}, EVENTS.RESULT, function (newResults) {
    return setState(newResults);
  }));
  return /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Content, {
    results: results
  }), /*#__PURE__*/React.createElement(ActionBar, {
    key: "actionbar",
    actionItems: [{
      title: 'emit',
      onClick: function onClick() {
        return emit(EVENTS.REQUEST);
      }
    }, {
      title: 'setState',
      onClick: function onClick() {
        return setState(['foo']);
      }
    }, {
      title: 'setState with options',
      onClick: function onClick() {
        return setState(['bar'], {
          persistence: 'session'
        });
      }
    }, {
      title: 'setState with function',
      onClick: function onClick() {
        return setState(function (s) {
          return [].concat(_toConsumableArray(s), ['baz']);
        });
      }
    }]
  }));
};