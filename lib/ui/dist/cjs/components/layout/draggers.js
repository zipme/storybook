"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Draggable", {
  enumerable: true,
  get: function get() {
    return _reactDraggable.default;
  }
});
Object.defineProperty(exports, "DraggableEvent", {
  enumerable: true,
  get: function get() {
    return _reactDraggable.DraggableEvent;
  }
});
Object.defineProperty(exports, "DraggableData", {
  enumerable: true,
  get: function get() {
    return _reactDraggable.DraggableData;
  }
});
exports.Handle = void 0;

var _reactDraggable = _interopRequireWildcard(require("react-draggable"));

var _theming = require("@storybook/theming");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Handle = _theming.styled.div(function (_ref) {
  var theme = _ref.theme,
      isDragging = _ref.isDragging;
  return {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: isDragging ? theme.color.secondary : theme.appBorderColor,
    overflow: 'hidden',
    transition: 'color 0.2s linear, background-position 0.2s linear, background-size 0.2s linear, background 0.2s linear',
    '&:hover': {
      color: theme.color.secondary
    }
  };
}, function (_ref2) {
  var axis = _ref2.axis;
  return {
    cursor: axis === 'x' ? 'col-resize' : 'row-resize'
  };
}, function (_ref3) {
  var theme = _ref3.theme,
      axis = _ref3.axis;
  return axis === 'x' ? {
    height: '100%',
    width: theme.layoutMargin,
    marginLeft: 0
  } : {
    height: theme.layoutMargin,
    width: '100%',
    marginTop: 0
  };
}, function (_ref4) {
  var axis = _ref4.axis,
      isDragging = _ref4.isDragging;

  if (axis === 'y') {
    var style = {
      backgroundImage: "radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)",
      backgroundSize: '100% 50px',
      backgroundPosition: '50% 0',
      backgroundRepeat: 'no-repeat'
    };
    return isDragging ? style : Object.assign({}, style, {
      backgroundPosition: '50% 10px',
      '&:hover': style
    });
  }

  if (axis === 'x') {
    var _style = {
      backgroundImage: "radial-gradient(at center center,rgba(0,0,0,0.2) 0%,transparent 70%,transparent 100%)",
      backgroundSize: '50px 100%',
      backgroundPosition: '0 50%',
      backgroundRepeat: 'no-repeat'
    };
    return isDragging ? _style : Object.assign({}, _style, {
      backgroundPosition: '10px 50%',
      '&:hover': _style
    });
  }

  return {};
});

exports.Handle = Handle;