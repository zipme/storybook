import "core-js/modules/es.array.concat";
import { start } from '@storybook/core/client';
import './globals';
import render from './render';

var _start = start(render),
    coreConfigure = _start.configure,
    clientApi = _start.clientApi,
    forceReRender = _start.forceReRender;

var framework = 'mithril';
export var storiesOf = function storiesOf(kind, m) {
  return clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};
export var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreConfigure.apply(void 0, [framework].concat(args));
};
var setAddon = clientApi.setAddon;
export { setAddon };
var addDecorator = clientApi.addDecorator;
export { addDecorator };
var addParameters = clientApi.addParameters;
export { addParameters };
var clearDecorators = clientApi.clearDecorators;
export { clearDecorators };
var getStorybook = clientApi.getStorybook;
export { getStorybook };
var raw = clientApi.raw;
export { raw };
export { forceReRender };