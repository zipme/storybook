import "core-js/modules/es.symbol";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.string.includes";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { themes, convert } from '@storybook/theming';
import { useChannel, useStorybookState } from '@storybook/api';
import { STORY_CHANGED, STORY_RENDERED } from '@storybook/core-events';
import { EVENTS } from '../constants';
var colorsByType = [convert(themes.normal).color.negative, // VIOLATION,
convert(themes.normal).color.positive, // PASS,
convert(themes.normal).color.warning // INCOMPLETION,
];
export var A11yContext = /*#__PURE__*/React.createContext({
  results: {
    passes: [],
    incomplete: [],
    violations: []
  },
  setResults: function setResults() {},
  highlighted: [],
  toggleHighlight: function toggleHighlight() {},
  clearHighlights: function clearHighlights() {},
  tab: 0,
  setTab: function setTab() {}
});
var defaultResult = {
  passes: [],
  incomplete: [],
  violations: []
};
export var A11yContextProvider = function A11yContextProvider(_ref) {
  var _useChannel;

  var active = _ref.active,
      props = _objectWithoutProperties(_ref, ["active"]);

  var _React$useState = React.useState(defaultResult),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      results = _React$useState2[0],
      setResults = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      tab = _React$useState4[0],
      setTab = _React$useState4[1];

  var _React$useState5 = React.useState([]),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      highlighted = _React$useState6[0],
      setHighlighted = _React$useState6[1];

  var _useStorybookState = useStorybookState(),
      storyId = _useStorybookState.storyId;

  var handleToggleHighlight = React.useCallback(function (target, highlight) {
    setHighlighted(function (prevHighlighted) {
      return highlight ? [].concat(_toConsumableArray(prevHighlighted), _toConsumableArray(target)) : prevHighlighted.filter(function (t) {
        return !target.includes(t);
      });
    });
  }, []);

  var handleRun = function handleRun(renderedStoryId) {
    emit(EVENTS.REQUEST, renderedStoryId);
  };

  var handleClearHighlights = React.useCallback(function () {
    return setHighlighted([]);
  }, []);
  var handleSetTab = React.useCallback(function (index) {
    handleClearHighlights();
    setTab(index);
  }, []);
  var handleReset = React.useCallback(function () {
    setTab(0);
    setResults(defaultResult); // Highlights is cleared by a11yHighlights.ts
  }, []);
  var emit = useChannel((_useChannel = {}, _defineProperty(_useChannel, STORY_RENDERED, handleRun), _defineProperty(_useChannel, STORY_CHANGED, handleReset), _useChannel));
  React.useEffect(function () {
    emit(EVENTS.HIGHLIGHT, {
      elements: highlighted,
      color: colorsByType[tab]
    });
  }, [highlighted, tab]);
  React.useEffect(function () {
    if (active) {
      handleRun(storyId);
    } else {
      handleClearHighlights();
    }
  }, [active, handleClearHighlights, emit, storyId]);
  if (!active) return null;
  return /*#__PURE__*/React.createElement(A11yContext.Provider, _extends({
    value: {
      results: results,
      setResults: setResults,
      highlighted: highlighted,
      toggleHighlight: handleToggleHighlight,
      clearHighlights: handleClearHighlights,
      tab: tab,
      setTab: handleSetTab
    }
  }, props));
};
export var useA11yContext = function useA11yContext() {
  return React.useContext(A11yContext);
};