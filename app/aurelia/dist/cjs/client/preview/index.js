"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateKnobsFor = generateKnobsFor;
Object.defineProperty(exports, "StoryFnAureliaReturnType", {
  enumerable: true,
  get: function get() {
    return _types.StoryFnAureliaReturnType;
  }
});
Object.defineProperty(exports, "addRegistries", {
  enumerable: true,
  get: function get() {
    return _decorators.addRegistries;
  }
});
Object.defineProperty(exports, "addContainer", {
  enumerable: true,
  get: function get() {
    return _decorators.addContainer;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _decorators.Component;
  }
});
Object.defineProperty(exports, "addComponents", {
  enumerable: true,
  get: function get() {
    return _decorators.addComponents;
  }
});
exports.raw = exports.getStorybook = exports.forceReRender = exports.setAddon = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.configure = exports.storiesOf = void 0;

var _aurelia = require("aurelia");

var _client = require("@storybook/core/client");

var _addonKnobs = require("@storybook/addon-knobs");

require("./globals");

var _render = _interopRequireDefault(require("./render"));

var _types = require("./types");

var _decorators = require("./decorators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var framework = 'Aurelia';
var api = (0, _client.start)(_render.default);

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

function generateKnobsFor(CustomElementClass) {
  var def = _aurelia.CustomElement.getDefinition(CustomElementClass);

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
        result[bindable] = (0, _addonKnobs.boolean)(bindable, elementConstructed[bindable]);
        return;

      case 'string':
        result[bindable] = (0, _addonKnobs.text)(bindable, elementConstructed[bindable] || 'lorem ipsum');
        return;

      case 'number':
      case 'bigint':
        result[bindable] = (0, _addonKnobs.number)(bindable, elementConstructed[bindable] || 0);
        return;

      case 'undefined':
        if (bindable.toLocaleLowerCase().includes('is')) {
          result[bindable] = (0, _addonKnobs.boolean)(bindable, elementConstructed[bindable]);
          return;
        }

        if (bindable.toLocaleLowerCase().includes('count') || bindable.toLocaleLowerCase().includes('max') || bindable.toLocaleLowerCase().includes('min')) {
          result[bindable] = (0, _addonKnobs.number)(bindable, elementConstructed[bindable] || 0);
          return;
        }

        if (bindable.toLocaleLowerCase().includes('date') || bindable.toLocaleLowerCase().includes('time')) {
          result[bindable] = (0, _addonKnobs.date)(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        result[bindable] = (0, _addonKnobs.text)(bindable, elementConstructed[bindable] || 'lorem ipsum');
        return;

      case 'object':
        if (currentVal instanceof Date) {
          result[bindable] = (0, _addonKnobs.date)(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        if (currentVal instanceof Date) {
          result[bindable] = (0, _addonKnobs.date)(bindable, elementConstructed[bindable] || new Date());
          return;
        }

        return;

      default:
        result[bindable] = (0, _addonKnobs.text)(bindable, elementConstructed[bindable] || 'lorem ipsum');
    }
  });
  return result;
}