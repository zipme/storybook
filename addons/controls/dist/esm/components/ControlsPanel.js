import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.object.values";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import { ArgsTable, NoControlsWarning } from '@storybook/components';
import { useArgs, useArgTypes, useParameter } from '@storybook/api';
import { PARAM_KEY } from '../constants';
export var ControlsPanel = function ControlsPanel() {
  var _useArgs = useArgs(),
      _useArgs2 = _slicedToArray(_useArgs, 3),
      args = _useArgs2[0],
      updateArgs = _useArgs2[1],
      resetArgs = _useArgs2[2];

  var rows = useArgTypes();
  var isArgsStory = useParameter('__isArgsStory', false);

  var _useParameter = useParameter(PARAM_KEY, {}),
      expanded = _useParameter.expanded,
      _useParameter$hideNoC = _useParameter.hideNoControlsWarning,
      hideNoControlsWarning = _useParameter$hideNoC === void 0 ? false : _useParameter$hideNoC;

  var hasControls = Object.values(rows).filter(function (argType) {
    return !!(argType !== null && argType !== void 0 && argType.control);
  }).length > 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, hasControls && isArgsStory || hideNoControlsWarning ? null : /*#__PURE__*/React.createElement(NoControlsWarning, null), /*#__PURE__*/React.createElement(ArgsTable, {
    compact: !expanded && hasControls,
    rows: rows,
    args: args,
    updateArgs: updateArgs,
    resetArgs: resetArgs,
    inAddonPanel: true
  }));
};