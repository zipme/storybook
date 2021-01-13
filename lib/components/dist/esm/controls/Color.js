import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { styled } from '@storybook/theming';
import { Form } from '../form';
var Swatch = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 6,
    width: 16,
    height: 16,
    boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
    borderRadius: '1rem'
  };
});
var ColorButton = styled(Form.Button)(function (_ref2) {
  var active = _ref2.active;
  return {
    zIndex: active ? 3 : 'unset',
    width: '100%'
  };
});
var Popover = styled.div({
  position: 'absolute',
  zIndex: 2
});

var format = function format(color) {
  return "rgba(".concat(color.rgb.r, ",").concat(color.rgb.g, ",").concat(color.rgb.b, ",").concat(color.rgb.a, ")");
};

export var ColorControl = function ColorControl(_ref3) {
  var name = _ref3.name,
      value = _ref3.value,
      _onChange = _ref3.onChange,
      onFocus = _ref3.onFocus,
      onBlur = _ref3.onBlur,
      presetColors = _ref3.presetColors;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPicker = _useState2[0],
      setShowPicker = _useState2[1];

  return /*#__PURE__*/React.createElement(ColorButton, {
    active: showPicker,
    type: "button",
    name: name,
    onClick: function onClick() {
      return setShowPicker(!showPicker);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        setShowPicker(!showPicker);
      }
    },
    size: "flex"
  }, value ? value.toUpperCase() : 'Choose color', /*#__PURE__*/React.createElement(Swatch, {
    style: {
      background: value
    }
  }), showPicker ? /*#__PURE__*/React.createElement(Popover, {
    onClick: function onClick(e) {
      // @ts-ignore
      if (e.target.tagName === 'INPUT') {
        e.stopPropagation();
      }
    }
  }, /*#__PURE__*/React.createElement(SketchPicker, _extends({
    color: value,
    onChange: function onChange(color) {
      return _onChange(format(color));
    }
  }, {
    onFocus: onFocus,
    onBlur: onBlur,
    presetColors: presetColors
  }))) : null);
};
ColorControl.displayName = "ColorControl";
export default ColorControl;