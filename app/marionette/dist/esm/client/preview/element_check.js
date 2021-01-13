import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.map";
import Marionette from 'backbone.marionette';
var allMarionetteViewConstructors = ['View', 'CompositeView', 'CollectionView', 'NextCollectionView'];
var viewConstructorsSupportedByMarionette = allMarionetteViewConstructors.filter(function (constructorName) {
  return constructorName in Marionette;
}).map(function (constructorName) {
  return Marionette[constructorName];
}); // accepts an element and return true if renderable else return false

var isMarionetteRenderable = function isMarionetteRenderable(element) {
  return viewConstructorsSupportedByMarionette.find(function (Constructor) {
    return element instanceof Constructor;
  });
};

export default isMarionetteRenderable;