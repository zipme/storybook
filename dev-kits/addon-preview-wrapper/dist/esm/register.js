import React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID } from './constants';

var PreviewWrapper = function PreviewWrapper(p) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      boxShadow: 'inset 0 0 10px black'
    }
  }, p.children);
};

addons.register(ADDON_ID, function () {
  addons.add(ADDON_ID, {
    title: 'edit page',
    type: types.PREVIEW,
    render: PreviewWrapper
  });
});