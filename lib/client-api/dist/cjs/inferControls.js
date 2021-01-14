"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inferControls = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _parameters = require("./parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inferControl = function inferControl(argType) {
  var type = argType.type;

  if (!type) {
    // console.log('no sbtype', { argType });
    return null;
  }

  switch (type.name) {
    case 'array':
      {
        var value = type.value;

        if (value !== null && value !== void 0 && value.name && ['object', 'other'].includes(value.name)) {
          return {
            type: 'object',
            validator: function validator(obj) {
              return Array.isArray(obj);
            }
          };
        }

        return {
          type: 'array'
        };
      }

    case 'boolean':
      return {
        type: 'boolean'
      };

    case 'string':
      return {
        type: 'text'
      };

    case 'number':
      return {
        type: 'number'
      };

    case 'enum':
      {
        var _ref = type,
            _value = _ref.value;

        if ((_value === null || _value === void 0 ? void 0 : _value.length) <= 5) {
          return {
            type: 'radio',
            options: _value
          };
        }

        return {
          type: 'select',
          options: _value
        };
      }

    case 'function':
    case 'symbol':
    case 'void':
      return null;

    default:
      return {
        type: 'object'
      };
  }
};

var inferControls = function inferControls(context) {
  var _context$parameters = context.parameters,
      __isArgsStory = _context$parameters.__isArgsStory,
      argTypes = _context$parameters.argTypes;
  if (!__isArgsStory) return argTypes;
  var withControls = (0, _mapValues.default)(argTypes, function (argType) {
    var control = argType && argType.type && inferControl(argType);
    return control ? {
      control: control
    } : undefined;
  });
  return (0, _parameters.combineParameters)(withControls, argTypes);
};

exports.inferControls = inferControls;