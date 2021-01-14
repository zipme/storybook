"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var serialize = function serialize(value) {
  return value;
};

var deserialize = function deserialize(value) {
  return value;
};

var SelectType = function SelectType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  var options = knob.options;

  var callbackReduceArrayOptions = function callbackReduceArrayOptions(acc, option, i) {
    if (_typeof(option) !== 'object' || option === null) return Object.assign({}, acc, _defineProperty({}, option, option));
    var label = option.label || option.key || i;
    return Object.assign({}, acc, _defineProperty({}, label, option));
  };

  var entries = Array.isArray(options) ? options.reduce(callbackReduceArrayOptions, {}) : options;
  var selectedKey = Object.keys(entries).find(function (key) {
    var knobVal = knob.value;
    var entryVal = entries[key];

    if (Array.isArray(knobVal)) {
      return JSON.stringify(entryVal) === JSON.stringify(knobVal);
    }

    return entryVal === knobVal;
  });
  return /*#__PURE__*/_react.default.createElement(_components.Form.Select, {
    value: selectedKey,
    name: knob.name,
    onChange: function onChange(e) {
      _onChange(entries[e.target.value]);
    },
    size: "flex"
  }, Object.entries(entries).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        key = _ref3[0];

    return /*#__PURE__*/_react.default.createElement("option", {
      key: key,
      value: key
    }, key);
  }));
};

SelectType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
SelectType.propTypes = {
  knob: _propTypes.default.shape({
    name: _propTypes.default.string,
    value: _propTypes.default.any,
    options: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object])
  }),
  onChange: _propTypes.default.func
};
SelectType.serialize = serialize;
SelectType.deserialize = deserialize;
var _default = SelectType;
exports.default = _default;