import "core-js/modules/es.array.filter";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import { inferActionsFromArgTypesRegex, addActionsFromArgTypes } from './addArgs';

var withDefaultValue = function withDefaultValue(argTypes) {
  return Object.keys(argTypes).filter(function (key) {
    return !!argTypes[key].defaultValue;
  });
};

describe('actions parameter enhancers', function () {
  describe('actions.argTypesRegex parameter', function () {
    var baseParameters = {
      argTypes: {
        onClick: {},
        onFocus: {},
        somethingElse: {}
      },
      actions: {
        argTypesRegex: '^on.*'
      }
    };
    it('should add actions that match a pattern', function () {
      var parameters = baseParameters;
      var argTypes = inferActionsFromArgTypesRegex({
        parameters: parameters
      });
      expect(withDefaultValue(argTypes)).toEqual(['onClick', 'onFocus']);
    });
    it('should prioritize pre-existing argTypes unless they are null', function () {
      var parameters = Object.assign({}, baseParameters, {
        argTypes: {
          onClick: {
            defaultValue: 'pre-existing value'
          },
          onFocus: {
            defaultValue: null
          }
        }
      });
      var argTypes = inferActionsFromArgTypesRegex({
        parameters: parameters
      });
      expect(withDefaultValue(argTypes)).toEqual(['onClick', 'onFocus']);
      expect(argTypes.onClick.defaultValue).toEqual('pre-existing value');
      expect(argTypes.onFocus.defaultValue).not.toBeNull();
    });
    it('should do nothing if actions are disabled', function () {
      var parameters = Object.assign({}, baseParameters, {
        actions: Object.assign({}, baseParameters.actions, {
          disable: true
        })
      });
      var result = inferActionsFromArgTypesRegex({
        parameters: parameters
      });
      expect(result).toEqual(parameters.argTypes);
    });
  });
  describe('argTypes.action parameter', function () {
    var baseParameters = {
      argTypes: {
        onClick: {
          action: 'clicked!'
        },
        onBlur: {
          action: 'blurred!'
        }
      }
    };
    it('should add actions based on action.args', function () {
      var parameters = baseParameters;
      var argTypes = addActionsFromArgTypes({
        parameters: parameters
      });
      expect(withDefaultValue(argTypes)).toEqual(['onClick', 'onBlur']);
    });
    it('should prioritize pre-existing args', function () {
      var parameters = Object.assign({}, baseParameters, {
        argTypes: {
          onClick: {
            defaultValue: 'pre-existing value',
            action: 'onClick'
          },
          onBlur: {
            action: 'onBlur'
          }
        }
      });
      var argTypes = addActionsFromArgTypes({
        parameters: parameters
      });
      expect(withDefaultValue(argTypes)).toEqual(['onClick', 'onBlur']);
      expect(argTypes.onClick.defaultValue).toEqual('pre-existing value');
    });
    it('should do nothing if actions are disabled', function () {
      var parameters = Object.assign({}, baseParameters, {
        actions: {
          disable: true
        }
      });
      var result = addActionsFromArgTypes({
        parameters: parameters
      });
      expect(result).toEqual(parameters.argTypes);
    });
  });
});