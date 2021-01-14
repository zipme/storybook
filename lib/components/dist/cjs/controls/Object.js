"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _form = require("../form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var Wrapper = _theming.styled.label({
  display: 'flex'
});

var ObjectControl = function ObjectControl(_ref) {
  var name = _ref.name,
      argType = _ref.argType,
      value = _ref.value,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      valid = _useState2[0],
      setValid = _useState2[1];

  var _useState3 = (0, _react.useState)(format(value)),
      _useState4 = _slicedToArray(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1];

  (0, _react.useEffect)(function () {
    var newText = format(value);
    if (text !== newText) setText(newText);
  }, [value]);
  var handleChange = (0, _react.useCallback)(function (e) {
    try {
      var newVal = parse(e.target.value);
      var newValid = validate(newVal, argType);

      if (newValid && !(0, _fastDeepEqual.default)(value, newVal)) {
        onChange(newVal);
      }

      setValid(newValid);
    } catch (err) {
      setValid(false);
    }

    setText(e.target.value);
  }, [onChange, setValid]);
  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_form.Form.Textarea, _extends({
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

exports.ObjectControl = ObjectControl;
ObjectControl.displayName = "ObjectControl";