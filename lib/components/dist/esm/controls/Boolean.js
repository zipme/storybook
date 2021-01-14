import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.string.bold";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { styled } from '@storybook/theming';
import { opacify, transparentize } from 'polished';
var Label = styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    lineHeight: '18px',
    alignItems: 'center',
    marginBottom: 8,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    background: "".concat(opacify(0.05, theme.appBorderColor)),
    borderRadius: '3em',
    padding: 1,
    input: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: '3em',
      '&:focus': {
        outline: 'none',
        boxShadow: "".concat(theme.color.secondary, " 0 0 0 1px inset !important")
      }
    },
    span: {
      textAlign: 'center',
      fontSize: theme.typography.size.s1,
      fontWeight: theme.typography.weight.bold,
      lineHeight: '1',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '7px 15px',
      transition: 'all 100ms ease-out',
      userSelect: 'none',
      borderRadius: '3em',
      color: transparentize(0.4, theme.color.defaultText),
      background: 'transparent',
      '&:hover': {
        boxShadow: "".concat(opacify(0.3, theme.appBorderColor), " 0 0 0 1px inset")
      },
      '&:active': {
        boxShadow: "".concat(opacify(0.05, theme.appBorderColor), " 0 0 0 2px inset"),
        color: opacify(1, theme.appBorderColor)
      },
      '&:first-of-type': {
        paddingRight: 8
      },
      '&:last-of-type': {
        paddingLeft: 8
      }
    },
    'input:checked ~ span:first-of-type, input:not(:checked) ~ span:last-of-type': {
      background: theme.background.bar,
      boxShadow: "".concat(opacify(0.1, theme.appBorderColor), " 0 0 2px"),
      color: theme.color.defaultText,
      padding: '7px 15px'
    }
  };
});

var format = function format(value) {
  return value ? String(value) : null;
};

var parse = function parse(value) {
  return value === 'true';
};

export var BooleanControl = function BooleanControl(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      _onChange = _ref2.onChange,
      onBlur = _ref2.onBlur,
      onFocus = _ref2.onFocus;
  return /*#__PURE__*/React.createElement(Label, {
    htmlFor: name,
    title: value ? 'Change to false' : 'Change to true'
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: name,
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: value || false
  }, {
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  })), /*#__PURE__*/React.createElement("span", null, "True"), /*#__PURE__*/React.createElement("span", null, "False"));
};
BooleanControl.displayName = "BooleanControl";