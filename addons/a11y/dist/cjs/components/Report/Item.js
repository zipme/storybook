"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _Info = require("./Info");

var _Elements = require("./Elements");

var _Tags = require("./Tags");

var _HighlightToggle = _interopRequireDefault(require("./HighlightToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Wrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    width: '100%',
    borderBottom: "1px solid ".concat(theme.appBorderColor),
    '&:hover': {
      background: theme.background.hoverable
    }
  };
});

var Icon = (0, _theming.styled)(_components.Icons)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    height: 10,
    width: 10,
    minWidth: 10,
    color: theme.color.mediumdark,
    marginRight: 10,
    transition: 'transform 0.1s ease-in-out',
    alignSelf: 'center',
    display: 'inline-flex'
  };
});

var HeaderBar = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    padding: theme.layoutMargin,
    paddingLeft: theme.layoutMargin - 3,
    background: 'none',
    color: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    width: '100%',
    '&:focus': {
      outline: '0 none',
      borderLeft: "3px solid ".concat(theme.color.secondary)
    }
  };
});

var HighlightToggleElement = _theming.styled.span({
  fontWeight: 'normal',
  float: 'right',
  marginRight: 15,
  alignSelf: 'center',
  input: {
    margin: 0
  }
});

// export class Item extends Component<ItemProps, ItemState> {
var Item = function Item(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      onToggle = _useState2[1];

  var item = props.item,
      type = props.type;
  var highlightToggleId = "".concat(type, "-").concat(item.id);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(HeaderBar, {
    onClick: function onClick() {
      return onToggle(!open);
    },
    role: "button"
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    icon: "chevrondown",
    size: 10,
    color: "#9DA5AB",
    style: {
      transform: "rotate(".concat(open ? 0 : -90, "deg)")
    }
  }), item.description), /*#__PURE__*/_react.default.createElement(HighlightToggleElement, null, /*#__PURE__*/_react.default.createElement(_HighlightToggle.default, {
    toggleId: highlightToggleId,
    elementsToHighlight: item.nodes
  }))), open ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_Info.Info, {
    item: item,
    key: "info"
  }), /*#__PURE__*/_react.default.createElement(_Elements.Elements, {
    elements: item.nodes,
    type: type,
    key: "elements"
  }), /*#__PURE__*/_react.default.createElement(_Tags.Tags, {
    tags: item.tags,
    key: "tags"
  })) : null);
};

exports.Item = Item;