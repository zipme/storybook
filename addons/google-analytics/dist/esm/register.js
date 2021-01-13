import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import { window } from 'global';
import { addons } from '@storybook/addons';
import { STORY_CHANGED, STORY_ERRORED, STORY_MISSING } from '@storybook/core-events';
import ReactGA from 'react-ga';
addons.register('storybook/google-analytics', function (api) {
  ReactGA.initialize(window.STORYBOOK_GA_ID, window.STORYBOOK_REACT_GA_OPTIONS);
  api.on(STORY_CHANGED, function () {
    var _api$getUrlState = api.getUrlState(),
        path = _api$getUrlState.path;

    ReactGA.pageview(path);
  });
  api.on(STORY_ERRORED, function (_ref) {
    var description = _ref.description;
    ReactGA.exception({
      description: description,
      fatal: true
    });
  });
  api.on(STORY_MISSING, function (id) {
    ReactGA.exception({
      description: "attempted to render ".concat(id, ", but it is missing"),
      fatal: false
    });
  });
});