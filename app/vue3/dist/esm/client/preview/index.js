import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable prefer-destructuring */
import { start } from '@storybook/core/client';
import './globals';
import { defineComponent, h } from 'vue';
import { render } from './render';
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

  return defineComponent({
    props: story.props,
    inject: {
      props: {
        from: PROPS,
        default: null
      }
    },
    render: function render() {
      return h(story, this.props || this.$props);
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
var api = start(render, {
  decorateStory: decorateStory
});
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
export var addDecorator = api.clientApi.addDecorator;
export var addParameters = api.clientApi.addParameters;
export var clearDecorators = api.clientApi.clearDecorators;
export var setAddon = api.clientApi.setAddon;
export var forceReRender = api.forceReRender;
export var getStorybook = api.clientApi.getStorybook;
export var raw = api.clientApi.raw;
export { app } from './render';