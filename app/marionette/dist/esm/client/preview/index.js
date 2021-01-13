import "core-js/modules/es.array.concat";
import { start } from '@storybook/core/client';
import './globals';
import render from './render';

var _start = start(render),
    coreLoad = _start.load,
    clientApi = _start.clientApi,
    configApi = _start.configApi,
    forceReRender = _start.forceReRender;

var setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook,
    raw = clientApi.raw;
export { setAddon, addDecorator, addParameters, clearDecorators, getStorybook, raw };
var framework = 'marionette';
export var storiesOf = function storiesOf() {
  return clientApi.storiesOf.apply(clientApi, arguments).addParameters({
    framework: framework
  });
};
export var load = function load() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreLoad.apply(void 0, args.concat([framework]));
};
var configure = configApi.configure;
export { configure };
export { forceReRender };