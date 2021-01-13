import React from 'react';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { ControlsPanel } from './components/ControlsPanel';
import { getTitle } from './title';
import { ADDON_ID, PARAM_KEY } from './constants';
addons.register(ADDON_ID, function (api) {
  addons.addPanel(ADDON_ID, {
    title: getTitle,
    type: types.PANEL,
    paramKey: PARAM_KEY,
    render: function render(_ref) {
      var key = _ref.key,
          active = _ref.active;

      if (!active || !api.getCurrentStoryData()) {
        return null;
      }

      return /*#__PURE__*/React.createElement(AddonPanel, {
        key: key,
        active: active
      }, /*#__PURE__*/React.createElement(ControlsPanel, null));
    }
  });
});