"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PreviewWrapper = function PreviewWrapper(p) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: 'inset 0 0 10px black'
    }
  }, p.children);
};

_addons.addons.register(_constants.ADDON_ID, function () {
  _addons.addons.add(_constants.ADDON_ID, {
    title: 'edit page',
    type: _addons.types.PREVIEW,
    render: PreviewWrapper
  });
});