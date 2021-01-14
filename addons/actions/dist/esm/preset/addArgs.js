import "core-js/modules/es.object.assign";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import mapValues from 'lodash/mapValues';
import { action } from '../index'; // interface ActionsParameter {
//   disable?: boolean;
//   argTypesRegex?: RegExp;
// }

/**
 * Automatically add action args for argTypes whose name
 * matches a regex, such as `^on.*` for react-style `onClick` etc.
 */

export var inferActionsFromArgTypesRegex = function inferActionsFromArgTypesRegex(context) {
  var _context$parameters = context.parameters,
      actions = _context$parameters.actions,
      argTypes = _context$parameters.argTypes;

  if (!actions || actions.disable || !actions.argTypesRegex || !argTypes) {
    return argTypes;
  }

  var argTypesRegex = new RegExp(actions.argTypesRegex);
  return mapValues(argTypes, function (argType, name) {
    if (!argTypesRegex.test(name)) {
      return argType;
    }

    return Object.assign({}, argType, {
      defaultValue: argType.defaultValue || action(name)
    });
  });
};
/**
 * Add action args for list of strings.
 */

export var addActionsFromArgTypes = function addActionsFromArgTypes(context) {
  var _context$parameters2 = context.parameters,
      argTypes = _context$parameters2.argTypes,
      actions = _context$parameters2.actions;

  if (actions !== null && actions !== void 0 && actions.disable || !argTypes) {
    return argTypes;
  }

  return mapValues(argTypes, function (argType, name) {
    if (!argType.action) {
      return argType;
    }

    var message = typeof argType.action === 'string' ? argType.action : name;
    return Object.assign({}, argType, {
      defaultValue: argType.defaultValue || action(message)
    });
  });
};
export var argTypesEnhancers = [addActionsFromArgTypes, inferActionsFromArgTypesRegex];