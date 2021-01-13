import { addons, types } from '@storybook/addons';
import GQL from './manager';
import { ADDON_ID, PARAM_KEY } from '.';
addons.register(ADDON_ID, function () {
  addons.add(ADDON_ID, {
    title: 'GraphiQL',
    type: types.TAB,
    route: function route(_ref) {
      var storyId = _ref.storyId;
      return "/graphql/".concat(storyId);
    },
    match: function match(_ref2) {
      var viewMode = _ref2.viewMode;
      return viewMode === 'graphql';
    },
    render: GQL,
    paramKey: PARAM_KEY
  });
});