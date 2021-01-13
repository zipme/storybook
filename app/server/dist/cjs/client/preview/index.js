"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _render = require("./render");

var framework = 'server';
var api = (0, _client.start)(_render.renderMain);

var storiesOf = function storiesOf(kind, m) {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var configure = function configure() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return api.configure.apply(api, [framework].concat(args));
};

exports.configure = configure;
var _api$clientApi = api.clientApi,
    addDecorator = _api$clientApi.addDecorator,
    addParameters = _api$clientApi.addParameters,
    clearDecorators = _api$clientApi.clearDecorators,
    setAddon = _api$clientApi.setAddon,
    forceReRender = _api$clientApi.forceReRender,
    getStorybook = _api$clientApi.getStorybook,
    raw = _api$clientApi.raw;
exports.raw = raw;
exports.getStorybook = getStorybook;
exports.forceReRender = forceReRender;
exports.setAddon = setAddon;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;