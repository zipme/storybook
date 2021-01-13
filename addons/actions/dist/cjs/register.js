"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _ActionLogger = _interopRequireDefault(require("./containers/ActionLogger"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons.addons.register(_constants.ADDON_ID, function (api) {
  _addons.addons.addPanel(_constants.PANEL_ID, {
    title: 'Actions',
    type: _addons.types.PANEL,
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/_react.default.createElement(_ActionLogger.default, {
        key: key,
        api: api,
        active: active
      });
    },
    paramKey: _constants.PARAM_KEY
  });
});