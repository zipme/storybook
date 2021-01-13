import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        We've detected a cycle in arg '", "'. Args should be JSON-serializable (-ish, functions are ok).\n\n        More info: https://storybook.js.org/docs/react/essentials/controls#fully-custom-args\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import mapValues from 'lodash/mapValues';
import dedent from 'ts-dedent';
import { logger } from '@storybook/client-logger';
import { combineParameters } from './parameters';

var inferType = function inferType(value, name, visited) {
  var type = _typeof(value);

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'function':
      return {
        name: type
      };

    case 'symbol':
      return {
        name: 'other',
        value: 'symbol'
      };

    default:
      break;
  }

  if (value) {
    if (visited.has(value)) {
      logger.warn(dedent(_templateObject(), name));
      return {
        name: 'other',
        value: 'cyclic object'
      };
    }

    visited.add(value);

    if (Array.isArray(value)) {
      var childType = value.length > 0 ? inferType(value[0], name, new Set(visited)) : {
        name: 'other',
        value: 'unknown'
      };
      return {
        name: 'array',
        value: childType
      };
    }

    var fieldTypes = mapValues(value, function (field) {
      return inferType(field, name, new Set(visited));
    });
    return {
      name: 'object',
      value: fieldTypes
    };
  }

  return {
    name: 'object',
    value: {}
  };
};

export var inferArgTypes = function inferArgTypes(context) {
  var id = context.id,
      parameters = context.parameters;
  var _parameters$argTypes = parameters.argTypes,
      userArgTypes = _parameters$argTypes === void 0 ? {} : _parameters$argTypes,
      _parameters$args = parameters.args,
      args = _parameters$args === void 0 ? {} : _parameters$args;
  if (!args) return userArgTypes;
  var argTypes = mapValues(args, function (arg, key) {
    return {
      type: inferType(arg, "".concat(id, ".").concat(key), new Set())
    };
  });
  return combineParameters(argTypes, userArgTypes);
};