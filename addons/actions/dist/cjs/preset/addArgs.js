"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argTypesEnhancers = exports.addActionsFromArgTypes = exports.inferActionsFromArgTypesRegex = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// interface ActionsParameter {
//   disable?: boolean;
//   argTypesRegex?: RegExp;
// }

/**
 * Automatically add action args for argTypes whose name
 * matches a regex, such as `^on.*` for react-style `onClick` etc.
 */
var inferActionsFromArgTypesRegex = function inferActionsFromArgTypesRegex(context) {
  var _context$parameters = context.parameters,
      actions = _context$parameters.actions,
      argTypes = _context$parameters.argTypes;

  if (!actions || actions.disable || !actions.argTypesRegex || !argTypes) {
    return argTypes;
  }

  var argTypesRegex = new RegExp(actions.argTypesRegex);
  return (0, _mapValues.default)(argTypes, function (argType, name) {
    if (!argTypesRegex.test(name)) {
      return argType;
    }

    return Object.assign({}, argType, {
      defaultValue: argType.defaultValue || (0, _index.action)(name)
    });
  });
};
/**
 * Add action args for list of strings.
 */


exports.inferActionsFromArgTypesRegex = inferActionsFromArgTypesRegex;

var addActionsFromArgTypes = function addActionsFromArgTypes(context) {
  var _context$parameters2 = context.parameters,
      argTypes = _context$parameters2.argTypes,
      actions = _context$parameters2.actions;

  if (actions !== null && actions !== void 0 && actions.disable || !argTypes) {
    return argTypes;
  }

  return (0, _mapValues.default)(argTypes, function (argType, name) {
    if (!argType.action) {
      return argType;
    }

    var message = typeof argType.action === 'string' ? argType.action : name;
    return Object.assign({}, argType, {
      defaultValue: argType.defaultValue || (0, _index.action)(message)
    });
  });
};

exports.addActionsFromArgTypes = addActionsFromArgTypes;
var argTypesEnhancers = [addActionsFromArgTypes, inferActionsFromArgTypesRegex];
exports.argTypesEnhancers = argTypesEnhancers;