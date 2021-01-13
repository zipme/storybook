import "core-js/modules/es.array.concat";
import { start } from '@storybook/core/client';
import './globals';
import { renderMain as render } from './render';
var framework = 'server';
var api = start(render);
export var storiesOf = function storiesOf(kind, m) {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};
export var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return api.configure.apply(api, [framework].concat(args));
};
var _api$clientApi = api.clientApi,
    addDecorator = _api$clientApi.addDecorator,
    addParameters = _api$clientApi.addParameters,
    clearDecorators = _api$clientApi.clearDecorators,
    setAddon = _api$clientApi.setAddon,
    forceReRender = _api$clientApi.forceReRender,
    getStorybook = _api$clientApi.getStorybook,
    raw = _api$clientApi.raw;
export { addDecorator, addParameters, clearDecorators, setAddon, forceReRender, getStorybook, raw };