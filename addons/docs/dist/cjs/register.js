"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _shared = require("./shared");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_addons.default.register(_shared.ADDON_ID, function () {
  _addons.default.add(_shared.PANEL_ID, {
    type: _addons.types.TAB,
    title: 'Docs',
    route: function route(_ref) {
      var storyId = _ref.storyId,
          refId = _ref.refId;
      return refId ? "/docs/".concat(refId, "_").concat(storyId) : "/docs/".concat(storyId);
    },
    match: function match(_ref2) {
      var viewMode = _ref2.viewMode;
      return viewMode === 'docs';
    },
    render: function render() {
      return null;
    }
  });
});