import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
import React, { useContext } from 'react';
import { Title as PureTitle } from '@storybook/components';
import { DocsContext } from './DocsContext';
export var extractTitle = function extractTitle(_ref) {
  var kind = _ref.kind,
      parameters = _ref.parameters;
  var groups = kind.split('/');
  return groups && groups[groups.length - 1] || kind;
};
export var Title = function Title(_ref2) {
  var children = _ref2.children;
  var context = useContext(DocsContext);
  var text = children;

  if (!text) {
    text = extractTitle(context);
  }

  return text ? /*#__PURE__*/React.createElement(PureTitle, {
    className: "sbdocs-title"
  }, text) : null;
};