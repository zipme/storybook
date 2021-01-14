import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.freeze";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.dom-collections.for-each";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      `clearDecorators` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-cleardecorators\n    "], ["\n      \\`clearDecorators\\` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-cleardecorators\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      `setAddon` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-setaddon\n    "], ["\n      \\`setAddon\\` is deprecated and will be removed in Storybook 7.0.\n\n      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-setaddon\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-underscore-dangle: 0 */
import deprecate from 'util-deprecate';
import dedent from 'ts-dedent';
import { logger } from '@storybook/client-logger';
import { toId } from '@storybook/csf';
import { applyHooks } from './hooks';
import { defaultDecorateStory } from './decorators'; // ClientApi (and StoreStore) are really singletons. However they are not created until the
// relevant framework instanciates them via `start.js`. The good news is this happens right away.

var singleton;
var addDecoratorDeprecationWarning = deprecate(function () {}, "`addDecorator` is deprecated, and will be removed in Storybook 7.0.\nInstead, use `export const decorators = [];` in your `preview.js`.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-addparameters-and-adddecorator).");
export var addDecorator = function addDecorator(decorator) {
  var deprecationWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!singleton) throw new Error("Singleton client API not yet initialized, cannot call addDecorator");
  if (deprecationWarning) addDecoratorDeprecationWarning();
  singleton.addDecorator(decorator);
};
var addParametersDeprecationWarning = deprecate(function () {}, "`addParameters` is deprecated, and will be removed in Storybook 7.0.\nInstead, use `export const parameters = {};` in your `preview.js`.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-addparameters-and-adddecorator).");
export var addParameters = function addParameters(parameters) {
  var deprecationWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!singleton) throw new Error("Singleton client API not yet initialized, cannot call addParameters");
  if (deprecationWarning) addParametersDeprecationWarning();
  singleton.addParameters(parameters);
};
var addLoaderDeprecationWarning = deprecate(function () {}, "`addLoader` is deprecated, and will be removed in Storybook 7.0.\nInstead, use `export const loaders = [];` in your `preview.js`.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-addparameters-and-adddecorator).");
export var addLoader = function addLoader(loader) {
  var deprecationWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (!singleton) throw new Error("Singleton client API not yet initialized, cannot call addParameters");
  if (deprecationWarning) addLoaderDeprecationWarning();
  singleton.addLoader(loader);
};
export var addArgTypesEnhancer = function addArgTypesEnhancer(enhancer) {
  if (!singleton) throw new Error("Singleton client API not yet initialized, cannot call addArgTypesEnhancer");
  singleton.addArgTypesEnhancer(enhancer);
};

var ClientApi = // React Native Fast refresh doesn't allow multiple dispose calls
function ClientApi(_ref) {
  var _this = this;

  var storyStore = _ref.storyStore,
      _ref$decorateStory = _ref.decorateStory,
      decorateStory = _ref$decorateStory === void 0 ? defaultDecorateStory : _ref$decorateStory,
      noStoryModuleAddMethodHotDispose = _ref.noStoryModuleAddMethodHotDispose;

  _classCallCheck(this, ClientApi);

  this._storyStore = void 0;
  this._addons = void 0;
  this._decorateStory = void 0;
  this._noStoryModuleAddMethodHotDispose = void 0;
  this.setAddon = deprecate(function (addon) {
    _this._addons = Object.assign({}, _this._addons, addon);
  }, dedent(_templateObject()));

  this.addDecorator = function (decorator) {
    _this._storyStore.addGlobalMetadata({
      decorators: [decorator]
    });
  };

  this.clearDecorators = deprecate(function () {
    _this._storyStore.clearGlobalDecorators();
  }, dedent(_templateObject2()));

  this.addParameters = function (parameters) {
    _this._storyStore.addGlobalMetadata({
      parameters: parameters
    });
  };

  this.addLoader = function (loader) {
    _this._storyStore.addGlobalMetadata({
      loaders: [loader]
    });
  };

  this.addArgTypesEnhancer = function (enhancer) {
    _this._storyStore.addArgTypesEnhancer(enhancer);
  };

  this.storiesOf = function (kind, m) {
    if (!kind && typeof kind !== 'string') {
      throw new Error('Invalid or missing kind provided for stories, should be a string');
    }

    if (!m) {
      logger.warn("Missing 'module' parameter for story with a kind of '".concat(kind, "'. It will break your HMR"));
    }

    if (m) {
      var proto = Object.getPrototypeOf(m);

      if (proto.exports && proto.exports.default) {
        // FIXME: throw an error in SB6.0
        logger.error("Illegal mix of CSF default export and storiesOf calls in a single file: ".concat(proto.i));
      }
    }

    if (m && m.hot && m.hot.dispose) {
      m.hot.dispose(function () {
        var _storyStore = _this._storyStore; // If HMR dispose happens in a story file, we know that HMR will pass up to the configuration file (preview.js)
        // and be handled by the HMR.allow in config_api, leading to a re-run of configuration.
        // So configuration is about to happen--we can skip the safety check.

        _storyStore.removeStoryKind(kind, {
          allowUnsafe: true
        });
      });
    }

    var hasAdded = false;
    var api = {
      kind: kind.toString(),
      add: function add() {
        return api;
      },
      addDecorator: function addDecorator() {
        return api;
      },
      addLoader: function addLoader() {
        return api;
      },
      addParameters: function addParameters() {
        return api;
      }
    }; // apply addons

    Object.keys(_this._addons).forEach(function (name) {
      var addon = _this._addons[name];

      api[name] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        addon.apply(api, args);
        return api;
      };
    });

    api.add = function (storyName, storyFn) {
      var parameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      hasAdded = true;
      var id = parameters.__id || toId(kind, storyName);

      if (typeof storyName !== 'string') {
        throw new Error("Invalid or missing storyName provided for a \"".concat(kind, "\" story."));
      }

      if (!_this._noStoryModuleAddMethodHotDispose && m && m.hot && m.hot.dispose) {
        m.hot.dispose(function () {
          var _storyStore = _this._storyStore; // See note about allowUnsafe above

          _storyStore.remove(id, {
            allowUnsafe: true
          });
        });
      }

      var fileName = m && m.id ? "".concat(m.id) : undefined;

      var decorators = parameters.decorators,
          loaders = parameters.loaders,
          storyParameters = _objectWithoutProperties(parameters, ["decorators", "loaders"]);

      _this._storyStore.addStory({
        id: id,
        kind: kind,
        name: storyName,
        storyFn: storyFn,
        parameters: Object.assign({
          fileName: fileName
        }, storyParameters),
        decorators: decorators,
        loaders: loaders
      }, {
        applyDecorators: applyHooks(_this._decorateStory)
      });

      return api;
    };

    api.addDecorator = function (decorator) {
      if (hasAdded) throw new Error("You cannot add a decorator after the first story for a kind.\nRead more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md#can-no-longer-add-decorators-parameters-after-stories");

      _this._storyStore.addKindMetadata(kind, {
        decorators: [decorator]
      });

      return api;
    };

    api.addLoader = function (loader) {
      if (hasAdded) throw new Error("You cannot add a loader after the first story for a kind.");

      _this._storyStore.addKindMetadata(kind, {
        loaders: [loader]
      });

      return api;
    };

    api.addParameters = function (parameters) {
      if (hasAdded) throw new Error("You cannot add parameters after the first story for a kind.\nRead more here: https://github.com/storybookjs/storybook/blob/master/MIGRATION.md#can-no-longer-add-decorators-parameters-after-stories");

      _this._storyStore.addKindMetadata(kind, {
        parameters: parameters
      });

      return api;
    };

    return api;
  };

  this.getStorybook = function () {
    return _this._storyStore.getStorybook();
  };

  this.raw = function () {
    return _this._storyStore.raw();
  };

  this.store = function () {
    return _this._storyStore;
  };

  this._storyStore = storyStore;
  this._addons = {};
  this._noStoryModuleAddMethodHotDispose = noStoryModuleAddMethodHotDispose || false;
  this._decorateStory = decorateStory;
  if (!storyStore) throw new Error('storyStore is required');
  singleton = this;
};

export { ClientApi as default };