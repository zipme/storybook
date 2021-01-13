import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    Props doc block has been renamed to ArgsTable.\n\n    https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewprops-renamed\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
import { ArgsTable } from './ArgsTable';
import { CURRENT_SELECTION } from './types';
export var Props = deprecate(function (props) {
  return /*#__PURE__*/React.createElement(ArgsTable, props);
}, dedent(_templateObject())); // @ts-ignore

Props.defaultProps = {
  of: CURRENT_SELECTION
};