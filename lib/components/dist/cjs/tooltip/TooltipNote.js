"use strict";

require("core-js/modules/es.string.bold");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipNote = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    padding: '2px 6px',
    lineHeight: '16px',
    fontSize: 10,
    fontWeight: theme.typography.weight.bold,
    color: theme.color.lightest,
    boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: -1,
    background: 'rgba(0, 0, 0, 0.4)',
    margin: 6
  };
});

var TooltipNote = function TooltipNote(_ref2) {
  var note = _ref2.note;
  return /*#__PURE__*/_react.default.createElement(Note, null, note);
};

exports.TooltipNote = TooltipNote;
TooltipNote.displayName = "TooltipNote";