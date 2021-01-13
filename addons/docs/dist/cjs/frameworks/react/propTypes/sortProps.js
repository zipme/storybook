"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keepOriginalDefinitionOrder = keepOriginalDefinitionOrder;

// react-docgen doesn't returned the props in the order they were defined in the "propTypes" object of the component.
// This function re-order them by their original definition order.
function keepOriginalDefinitionOrder(extractedProps, component) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  var propTypes = component.propTypes;

  if (propTypes != null) {
    return Object.keys(propTypes).map(function (x) {
      return extractedProps.find(function (y) {
        return y.name === x;
      });
    }).filter(function (x) {
      return x;
    });
  }

  return extractedProps;
}