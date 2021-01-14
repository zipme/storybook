import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable prefer-destructuring */
import Vue from 'vue';
import { start } from '@storybook/core/client';
import './globals';
import render, { VALUES } from './render';
import { extractProps } from './util';
export var WRAPS = 'STORYBOOK_WRAPS';

function prepare(rawStory, innerStory) {
  var _Vue$extend;

  var story;

  if (typeof rawStory === 'string') {
    story = {
      template: rawStory
    };
  } else if (rawStory != null) {
    story = rawStory;
  } else {
    return null;
  } // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle


  if (!story._isVue) {
    if (innerStory) {
      story.components = Object.assign({}, story.components || {}, {
        story: innerStory
      });
    }

    story = Vue.extend(story); // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307984824
  } else if (story.options[WRAPS]) {
    return story;
  }

  return Vue.extend((_Vue$extend = {}, _defineProperty(_Vue$extend, WRAPS, story), _defineProperty(_Vue$extend, VALUES, Object.assign({}, innerStory ? innerStory.options[VALUES] : {}, extractProps(story))), _defineProperty(_Vue$extend, "functional", true), _defineProperty(_Vue$extend, "render", function render(h, _ref) {
    var data = _ref.data,
        parent = _ref.parent,
        children = _ref.children;
    return h(story, Object.assign({}, data, {
      // @ts-ignore // https://github.com/storybookjs/storybook/pull/7578#discussion_r307986196
      props: Object.assign({}, data.props || {}, parent.$root[VALUES])
    }), children);
  }), _Vue$extend));
}

var defaultContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {}
};

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

var framework = 'vue';
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