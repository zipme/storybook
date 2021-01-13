"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "app", {
  enumerable: true,
  get: function get() {
    return _render.app;
  }
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _vue = require("vue");

var _render = require("./render");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {}
};
var PROPS = 'STORYBOOK_PROPS';

function prepare(story, innerStory) {
  if (story == null) {
    return null;
  }

  if (innerStory) {
    return Object.assign({}, story, {
      components: {
        story: innerStory
      },
      props: innerStory.props,
      inject: {
        props: {
          from: PROPS,
          default: null
        }
      },
      provide: function provide() {
        return _defineProperty({}, PROPS, this.props || this.$props);
      }
    });
  }

  return (0, _vue.defineComponent)({
    props: story.props,
    inject: {
      props: {
        from: PROPS,
        default: null
      }
    },
    render: function render() {
      return (0, _vue.h)(story, this.props || this.$props);
    }
  });
}

function decorateStory(storyFn, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultContext;
      var story;
      var decoratedStory = decorator(function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var parameters = _ref2.parameters,
            innerContext = _objectWithoutProperties(_ref2, ["parameters"]);

        story = decorated(Object.assign({}, context, innerContext));
        return story;
      }, context);

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      return prepare(decoratedStory, story);
    };
  }, function (context) {
    return prepare(storyFn(context));
  });
}

var framework = 'vue3';
var api = (0, _client.start)(_render.render, {
  decorateStory: decorateStory
});

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
var addDecorator = api.clientApi.addDecorator;
exports.addDecorator = addDecorator;
var addParameters = api.clientApi.addParameters;
exports.addParameters = addParameters;
var clearDecorators = api.clientApi.clearDecorators;
exports.clearDecorators = clearDecorators;
var setAddon = api.clientApi.setAddon;
exports.setAddon = setAddon;
var forceReRender = api.forceReRender;
exports.forceReRender = forceReRender;
var getStorybook = api.clientApi.getStorybook;
exports.getStorybook = getStorybook;
var raw = api.clientApi.raw;
exports.raw = raw;