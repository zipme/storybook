"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Content = void 0;

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Content = function Content() {
  var results = (0, _api.useParameter)(_constants.PARAM_KEY, []);
  return (0, _react.useMemo)(function () {
    return results.length ? /*#__PURE__*/_react.default.createElement("ol", null, results.map(function (i, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        _react.default.createElement("li", {
          key: index
        }, i)
      );
    })) : null;
  }, [results]);
};

exports.Content = Content;

_addons.addons.register(_constants.ADDON_ID, function () {
  _addons.addons.add(_constants.PANEL_ID, {
    title: 'parameter',
    type: _addons.types.PANEL,
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/_react.default.createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react.default.createElement(Content, null));
    }
  });
});