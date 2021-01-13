"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.object.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isForwardRef = exports.isMemo = void 0;

var isMemo = function isMemo(component) {
  return component.$$typeof === Symbol.for('react.memo');
};

exports.isMemo = isMemo;

var isForwardRef = function isForwardRef(component) {
  return component.$$typeof === Symbol.for('react.forward_ref');
};

exports.isForwardRef = isForwardRef;