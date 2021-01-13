import "core-js/modules/es.array.concat";
import { start } from '@storybook/core/client';
import './globals';
import riot, { tag2, mount as vendorMount } from 'riot';
import render from './render';
import { compileNow as unboundCompileNow, asCompiledCode } from './compileStageFunctions';

var _start = start(render),
    coreConfigure = _start.configure,
    clientApi = _start.clientApi,
    forceReRender = _start.forceReRender;

var setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook,
    raw = clientApi.raw;
export { setAddon, addDecorator, addParameters, clearDecorators, getStorybook, raw };
var framework = 'riot';
export var storiesOf = function storiesOf() {
  return clientApi.storiesOf.apply(clientApi, arguments).addParameters({
    framework: framework
  });
};
export var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreConfigure.apply(void 0, [framework].concat(args));
};
var mount = vendorMount.bind(riot, '#root');
var compileNow = unboundCompileNow.bind(null, tag2);
export { forceReRender, render, tag2 as tag, mount, compileNow, asCompiledCode };