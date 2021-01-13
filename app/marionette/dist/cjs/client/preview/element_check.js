"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _backbone = _interopRequireDefault(require("backbone.marionette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allMarionetteViewConstructors = ['View', 'CompositeView', 'CollectionView', 'NextCollectionView'];
var viewConstructorsSupportedByMarionette = allMarionetteViewConstructors.filter(function (constructorName) {
  return constructorName in _backbone.default;
}).map(function (constructorName) {
  return _backbone.default[constructorName];
}); // accepts an element and return true if renderable else return false

var isMarionetteRenderable = function isMarionetteRenderable(element) {
  return viewConstructorsSupportedByMarionette.find(function (Constructor) {
    return element instanceof Constructor;
  });
};

var _default = isMarionetteRenderable;
exports.default = _default;