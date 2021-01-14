import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import React, { Suspense } from 'react';
export * from './types';
export * from './Array';
export * from './Boolean';
var LazyColorControl = /*#__PURE__*/React.lazy(function () {
  return import('./Color');
});
export var ColorControl = function ColorControl(props) {
  return /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", null)
  }, /*#__PURE__*/React.createElement(LazyColorControl, props));
};
ColorControl.displayName = "ColorControl";
export * from './Date';
export * from './Number';
export * from './options';
export * from './Object';
export * from './Range';
export * from './Text';