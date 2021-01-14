"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferArgTypes = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _clientLogger = require("@storybook/client-logger");

var _parameters = require("./parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        We've detected a cycle in arg '", "'. Args should be JSON-serializable (-ish, functions are ok).\n\n        More info: https://storybook.js.org/docs/react/essentials/controls#fully-custom-args\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      _clientLogger.logger.warn((0, _tsDedent.default)(_templateObject(), name));

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

    var fieldTypes = (0, _mapValues.default)(value, function (field) {
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

var inferArgTypes = function inferArgTypes(context) {
  var id = context.id,
      parameters = context.parameters;
  var _parameters$argTypes = parameters.argTypes,
      userArgTypes = _parameters$argTypes === void 0 ? {} : _parameters$argTypes,
      _parameters$args = parameters.args,
      args = _parameters$args === void 0 ? {} : _parameters$args;
  if (!args) return userArgTypes;
  var argTypes = (0, _mapValues.default)(args, function (arg, key) {
    return {
      type: inferType(arg, "".concat(id, ".").concat(key), new Set())
    };
  });
  return (0, _parameters.combineParameters)(argTypes, userArgTypes);
};

exports.inferArgTypes = inferArgTypes;