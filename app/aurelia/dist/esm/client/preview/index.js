import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.includes";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { CustomElement } from 'aurelia';
/* eslint-disable prefer-destructuring */

import { start } from '@storybook/core/client';
import { text, boolean, number, date } from '@storybook/addon-knobs';
import './globals';
import render from './render';
import { StoryFnAureliaReturnType } from './types';
import { addRegistries, addContainer, Component, addComponents } from './decorators';
var framework = 'Aurelia';
var api = start(render);
export var storiesOf = function storiesOf(kind, m) {
  return api.clientApi.storiesOf(kind, m).addParameters({
    framework: framework
  });
};
export { StoryFnAureliaReturnType, addRegistries, addContainer, Component, addComponents };
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
export function generateKnobsFor(CustomElementClass) {
  var def = CustomElement.getDefinition(CustomElementClass);
  var bindables = def && def.bindables;
  if (!bindables) return /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    return _class;
  }();

  var result = function result() {
    _classCallCheck(this, result);
  };

  var elementConstructed = new CustomElementClass();
  Object.keys(bindables).map(function (y) {
    return bindables[y];
  }).forEach(function (bindableDef) {
    var bindable = bindableDef.property;
    var currentVal = elementConstructed[bindable];

    switch (_typeof(currentVal)) {
      case 'boolean':
        result[bindable] = boolean(bindable, elementConstructed[bindable]);
        return;

      case 'string':
        result[bindable] = text(bindable, elementConstructed[bindable] || 'lorem ipsum');
        return;

      case 'number':
      case 'bigint':
        result[bindable] = number(bindable, elementConstructed[bindable] || 0);
        return;

      case 'undefined':
        if (bindable.toLocaleLowerCase().includes('is')) {
          result[bindable] = boolean(bindable, elementConstructed[bindable]);
          return;
        }

        if (bindable.toLocaleLowerCase().includes('count') || bindable.toLocaleLowerCase().includes('max') || bindable.toLocaleLowerCase().includes('min')) {
          result[bindable] = number(bindable, elementConstructed[bindable] || 0);
          return;
        }

        if (bindable.toLocaleLowerCase().includes('date') || bindable.toLocaleLowerCase().includes('time')) {
          result[bindable] = date(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        result[bindable] = text(bindable, elementConstructed[bindable] || 'lorem ipsum');
        return;

      case 'object':
        if (currentVal instanceof Date) {
          result[bindable] = date(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        if (currentVal instanceof Date) {
          result[bindable] = date(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        return;

      default:
        result[bindable] = text(bindable, elementConstructed[bindable] || 'lorem ipsum');
    }
  });
  return result;
}