import "core-js/modules/es.array.map";
import React, { useMemo } from 'react';
import { useParameter } from '@storybook/api';
import { addons, types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
export var Content = function Content() {
  var results = useParameter(PARAM_KEY, []);
  return useMemo(function () {
    return results.length ? /*#__PURE__*/React.createElement("ol", null, results.map(function (i, index) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line react/no-array-index-key
        React.createElement("li", {
          key: index
        }, i)
      );
    })) : null;
  }, [results]);
};
addons.register(ADDON_ID, function () {
  addons.add(PANEL_ID, {
    title: 'parameter',
    type: types.PANEL,
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/React.createElement(AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/React.createElement(Content, null));
    }
  });
});