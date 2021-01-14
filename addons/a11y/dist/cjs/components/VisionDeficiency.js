"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionDeficiency = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _ColorFilters = require("./ColorFilters");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var iframeId = 'storybook-preview-iframe';
var baseList = ['blurred vision', 'protanopia', 'protanomaly', 'deuteranopia', 'deuteranomaly', 'tritanopia', 'tritanomaly', 'achromatopsia', 'achromatomaly', 'mono'];

var getFilter = function getFilter(filter) {
  if (!filter) {
    return 'none';
  }

  if (filter === 'blurred vision') {
    return 'blur(2px)';
  }

  if (filter === 'mono') {
    return 'grayscale(100%)';
  }

  return "url('#".concat(filter, "')");
};

var Hidden = _theming.styled.div(function () {
  return {
    '&, & svg': {
      position: 'absolute',
      width: 0,
      height: 0
    }
  };
});

var ColorIcon = _theming.styled.span({
  background: 'linear-gradient(to right, #F44336, #FF9800, #FFEB3B, #8BC34A, #2196F3, #9C27B0)',
  borderRadius: '1rem',
  display: 'block',
  height: '1rem',
  width: '1rem'
}, function (_ref) {
  var filter = _ref.filter;
  return {
    filter: getFilter(filter)
  };
}, function (_ref2) {
  var theme = _ref2.theme;
  return {
    boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset")
  };
});

var getColorList = function getColorList(active, set) {
  return [].concat(_toConsumableArray(active !== null ? [{
    id: 'reset',
    title: 'Reset color filter',
    onClick: function onClick() {
      set(null);
    },
    right: undefined,
    active: false
  }] : []), _toConsumableArray(baseList.map(function (i) {
    return {
      id: i,
      title: i.charAt(0).toUpperCase() + i.slice(1),
      onClick: function onClick() {
        set(i);
      },
      right: /*#__PURE__*/_react.default.createElement(ColorIcon, {
        filter: i
      }),
      active: active === i
    };
  })));
};

var VisionDeficiency = function VisionDeficiency() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, filter && /*#__PURE__*/_react.default.createElement(_theming.Global, {
    styles: _defineProperty({}, "#".concat(iframeId), {
      filter: getFilter(filter)
    })
  }), /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip(_ref4) {
      var onHide = _ref4.onHide;
      var colorList = getColorList(filter, function (i) {
        setFilter(i);
        onHide();
      });
      return /*#__PURE__*/_react.default.createElement(_components.TooltipLinkList, {
        links: colorList
      });
    },
    closeOnClick: true,
    onDoubleClick: function onDoubleClick() {
      return setFilter(null);
    }
  }, /*#__PURE__*/_react.default.createElement(_components.IconButton, {
    key: "filter",
    active: !!filter,
    title: "Vision Deficiency Emulation"
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "mirror"
  }))), /*#__PURE__*/_react.default.createElement(Hidden, null, /*#__PURE__*/_react.default.createElement(_ColorFilters.Filters, null)));
};

exports.VisionDeficiency = VisionDeficiency;