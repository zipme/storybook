import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.trim";
import "core-js/modules/web.dom-collections.iterator";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState, useCallback, useEffect } from 'react';
import { styled } from '@storybook/theming';
import deepEqual from 'fast-deep-equal';
import { Form } from '../form';

var format = function format(value) {
  return value ? JSON.stringify(value) : '';
};

var parse = function parse(value) {
  var trimmed = value && value.trim();
  return trimmed ? JSON.parse(trimmed) : {};
};

var validate = function validate(value, argType) {
  if (argType && argType.type.name === 'array') {
    return Array.isArray(value);
  }

  return true;
};

var Wrapper = styled.label({
  display: 'flex'
});
export var ObjectControl = function ObjectControl(_ref) {
  var name = _ref.name,
      argType = _ref.argType,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      valid = _useState2[0],
      setValid = _useState2[1];

  var _useState3 = useState(format(value)),
      _useState4 = _slicedToArray(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1];

  useEffect(function () {
    var newText = format(value);
    if (text !== newText) setText(newText);
  }, [value]);
  var handleChange = useCallback(function (e) {
    try {
      var newVal = parse(e.target.value);
      var newValid = validate(newVal, argType);

      if (newValid && !deepEqual(value, newVal)) {
        onChange(newVal);
      }

      setValid(newValid);
    } catch (err) {
      setValid(false);
    }

    setText(e.target.value);
  }, [onChange, setValid]);
  return /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Form.Textarea, _extends({
    valid: valid ? undefined : 'error',
    value: text,
    onChange: handleChange,
    size: "flex",
    placeholder: "Adjust object dynamically"
  }, {
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  })));
};
ObjectControl.displayName = "ObjectControl";