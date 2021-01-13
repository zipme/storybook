import "core-js/modules/es.object.assign";
import KnobManager from './KnobManager';
jest.mock('global', function () {
  return {
    navigator: {
      userAgent: 'browser',
      platform: ''
    },
    window: {
      __STORYBOOK_CLIENT_API__: undefined,
      addEventListener: jest.fn(),
      location: {
        search: ''
      },
      history: {
        replaceState: jest.fn()
      }
    },
    document: {
      addEventListener: jest.fn(),
      getElementById: jest.fn().mockReturnValue({}),
      body: {
        classList: {
          add: jest.fn(),
          remove: jest.fn()
        }
      },
      documentElement: {},
      location: {
        search: '?id=kind--story'
      }
    }
  };
});
describe('KnobManager', function () {
  describe('knob()', function () {
    describe('when the knob is present in the knobStore', function () {
      var testManager = new KnobManager();
      beforeEach(function () {
        testManager.knobStore = {
          set: jest.fn(),
          update: jest.fn(),
          get: function get() {
            return {
              defaultValue: 'default value',
              name: 'foo',
              type: 'string',
              value: 'current value'
            };
          }
        };
      });
      it('should return the existing knob value when types match', function () {
        var defaultKnob = {
          name: 'foo',
          type: 'string',
          value: 'default value'
        };
        var knob = testManager.knob('foo', defaultKnob);
        expect(knob).toEqual('current value');
        expect(testManager.knobStore.set).not.toHaveBeenCalled();
      });
      it('should update the existing knob options when types match', function () {
        var defaultKnob = {
          name: 'foo',
          type: 'string',
          value: 'default value',
          foo: 'foo'
        };
        testManager.knob('foo', defaultKnob);
        expect(testManager.knobStore.update).toHaveBeenCalledWith('foo', expect.objectContaining({
          foo: 'foo'
        }));
      });
      it('should return the new default knob value when type has changed', function () {
        var defaultKnob = {
          name: 'foo',
          value: true,
          type: 'boolean'
        };
        testManager.knob('foo', defaultKnob);
        var newKnob = Object.assign({}, defaultKnob, {
          label: 'foo',
          defaultValue: defaultKnob.value
        });
        expect(testManager.knobStore.set).toHaveBeenCalledWith('foo', newKnob);
      });
    });
    describe('when the knob is not present in the knobStore', function () {
      var testManager = new KnobManager();
      beforeEach(function () {
        testManager.knobStore = {
          set: jest.fn(),
          get: jest.fn()
        };
        testManager.knobStore.get.mockImplementationOnce(function () {
          return undefined;
        }).mockImplementationOnce(function () {
          return 'normal value';
        });
      });
      it('should return the new default knob value when default has changed', function () {
        var defaultKnob = {
          name: 'foo',
          value: 'normal value'
        };
        testManager.knob('foo', defaultKnob);
        var newKnob = Object.assign({}, defaultKnob, {
          label: 'foo',
          defaultValue: defaultKnob.value
        });
        expect(testManager.knobStore.set).toHaveBeenCalledWith('foo', newKnob);
      });
    });
  });
});