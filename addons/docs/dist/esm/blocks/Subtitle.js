import React, { useContext } from 'react';
import { Subtitle as PureSubtitle } from '@storybook/components';
import { DocsContext } from './DocsContext';
export var Subtitle = function Subtitle(_ref) {
  var children = _ref.children;
  var context = useContext(DocsContext);
  var parameters = context.parameters;
  var text = children;

  if (!text) {
    text = parameters === null || parameters === void 0 ? void 0 : parameters.componentSubtitle;
  }

  return text ? /*#__PURE__*/React.createElement(PureSubtitle, {
    className: "sbdocs-subtitle"
  }, text) : null;
};