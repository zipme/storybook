import "core-js/modules/es.string.bold";
import React from 'react';
import { styled } from '@storybook/theming';
var Note = styled.div(function (_ref) {
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
export var TooltipNote = function TooltipNote(_ref2) {
  var note = _ref2.note;
  return /*#__PURE__*/React.createElement(Note, null, note);
};
TooltipNote.displayName = "TooltipNote";