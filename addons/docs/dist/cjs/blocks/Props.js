"use strict";

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Props = void 0;

var _react = _interopRequireDefault(require("react"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _ArgsTable = require("./ArgsTable");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    Props doc block has been renamed to ArgsTable.\n\n    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewprops-renamed\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Props = (0, _utilDeprecate.default)(function (props) {
  return /*#__PURE__*/_react.default.createElement(_ArgsTable.ArgsTable, props);
}, (0, _tsDedent.default)(_templateObject())); // @ts-ignore

exports.Props = Props;
Props.defaultProps = {
  of: _types.CURRENT_SELECTION
};