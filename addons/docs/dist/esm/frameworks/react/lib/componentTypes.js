import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.object.to-string";
export var isMemo = function isMemo(component) {
  return component.$$typeof === Symbol.for('react.memo');
};
export var isForwardRef = function isForwardRef(component) {
  return component.$$typeof === Symbol.for('react.forward_ref');
};