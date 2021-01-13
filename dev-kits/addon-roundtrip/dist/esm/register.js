import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { ADDON_ID, PANEL_ID } from './constants';
import { Panel } from './panel';
addons.register(ADDON_ID, function () {
  addons.add(PANEL_ID, {
    title: 'roundtrip',
    type: types.PANEL,
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/React.createElement(AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/React.createElement(Panel, null));
    }
  });
});