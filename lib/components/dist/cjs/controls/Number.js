"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberControl = exports.format = exports.parse = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _form = require("../form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Wrapper = _theming.styled.label({
  display: 'flex'
});

var parse = function parse(value) {
  var result = parseFloat(value);
  return Number.isNaN(result) ? null : result;
};

exports.parse = parse;

var format = function format(value) {
  return value != null ? String(value) : '';
};

exports.format = format;

var NumberControl = function NumberControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var handleChange = function handleChange(event) {
    onChange(parse(event.target.value));
  };

  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_form.Form.Input, _extends({
    type: "number",
    onChange: handleChange,
    size: "flex",
    placeholder: "Adjust number dynamically"
  }, {
    name: name,
    value: value,
    min: min,
    max: max,
    step: step,
    onFocus: onFocus,
    onBlur: onBlur
  })));
};

exports.NumberControl = NumberControl;
NumberControl.displayName = "NumberControl";