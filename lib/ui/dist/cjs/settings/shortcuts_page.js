"use strict";

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortcutsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _api = require("@storybook/api");

var _shortcuts = require("./shortcuts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ShortcutsPage = function ShortcutsPage() {
  return /*#__PURE__*/_react.default.createElement(_api.Consumer, null, function (_ref) {
    var _ref$api = _ref.api,
        getShortcutKeys = _ref$api.getShortcutKeys,
        setShortcut = _ref$api.setShortcut,
        restoreDefaultShortcut = _ref$api.restoreDefaultShortcut,
        restoreAllDefaultShortcuts = _ref$api.restoreAllDefaultShortcuts;
    return /*#__PURE__*/_react.default.createElement(_shortcuts.ShortcutsScreen, _extends({
      shortcutKeys: getShortcutKeys()
    }, {
      setShortcut: setShortcut,
      restoreDefaultShortcut: restoreDefaultShortcut,
      restoreAllDefaultShortcuts: restoreAllDefaultShortcuts
    }));
  });
};

exports.ShortcutsPage = ShortcutsPage;
ShortcutsPage.displayName = "ShortcutsPage";