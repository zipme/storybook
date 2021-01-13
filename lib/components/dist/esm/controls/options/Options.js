import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { CheckboxControl } from './Checkbox';
import { RadioControl } from './Radio';
import { SelectControl } from './Select';

/**
 * Options can accept `options` in two formats:
 * - array: ['a', 'b', 'c'] OR
 * - object: { a: 1, b: 2, c: 3 }
 *
 * We always normalize to the more generalized object format and ONLY handle
 * the object format in the underlying control implementations.
 */
var normalizeOptions = function normalizeOptions(options) {
  if (Array.isArray(options)) {
    return options.reduce(function (acc, item) {
      acc[String(item)] = item;
      return acc;
    }, {});
  }

  return options;
};

export var OptionsControl = function OptionsControl(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? 'select' : _props$type,
      options = props.options;
  var normalized = Object.assign({}, props, {
    options: normalizeOptions(options)
  });

  switch (type) {
    case 'check':
    case 'inline-check':
      return /*#__PURE__*/React.createElement(CheckboxControl, _extends({}, normalized, {
        isInline: type === 'inline-check'
      }));

    case 'radio':
    case 'inline-radio':
      return /*#__PURE__*/React.createElement(RadioControl, _extends({}, normalized, {
        isInline: type === 'inline-radio'
      }));

    case 'select':
    case 'multi-select':
      return /*#__PURE__*/React.createElement(SelectControl, _extends({}, normalized, {
        isMulti: type === 'multi-select'
      }));

    default:
      throw new Error("Unknown options type: ".concat(type));
  }
};