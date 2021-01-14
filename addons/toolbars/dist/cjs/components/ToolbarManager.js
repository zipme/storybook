"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarManager = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _components = require("@storybook/components");

var _MenuToolbar = require("./MenuToolbar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var normalize = function normalize(key, argType) {
  return Object.assign({}, argType, {
    name: argType.name || key,
    description: argType.description || key,
    toolbar: Object.assign({}, argType.toolbar, {
      items: argType.toolbar.items.map(function (item) {
        return typeof item === 'string' ? {
          value: item,
          title: item
        } : item;
      })
    })
  });
};
/**
 * A smart component for handling manager-preview interactions.
 */


var ToolbarManager = function ToolbarManager() {
  var globalTypes = (0, _api.useGlobalTypes)();
  var keys = Object.keys(globalTypes).filter(function (key) {
    return !!globalTypes[key].toolbar;
  });
  if (!keys.length) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_components.Separator, null), keys.map(function (key) {
    var normalizedConfig = normalize(key, globalTypes[key]);
    return /*#__PURE__*/_react.default.createElement(_MenuToolbar.MenuToolbar, _extends({
      key: key,
      id: key
    }, normalizedConfig));
  }));
};

exports.ToolbarManager = ToolbarManager;