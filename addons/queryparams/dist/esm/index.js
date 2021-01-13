import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.search";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.url";
import { document, history } from 'global';
import qs from 'qs';
import { makeDecorator } from '@storybook/addons';
import { PARAM_KEY } from './constants';
export var withQuery = makeDecorator({
  name: 'withQuery',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: true,
  wrapper: function wrapper(getStory, context, _ref) {
    var parameters = _ref.parameters;
    var location = document.location;
    var currentQuery = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });
    var additionalQuery = typeof parameters === 'string' ? qs.parse(parameters, {
      ignoreQueryPrefix: true
    }) : parameters;
    var newLocation = new URL(document.location.href);
    newLocation.search = qs.stringify(Object.assign({}, currentQuery, additionalQuery));
    history.replaceState({}, document.title, newLocation.toString());
    return getStory(context);
  }
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}