"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _internal = require("svelte/internal");

var _global = require("global");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Svelte component configuration from the story?\n        Use \"() => ({ Component: YourComponent, data: {} })\"\n        when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var previousComponent = null;

function cleanUpPreviousStory() {
  if (!previousComponent) {
    return;
  }

  previousComponent.$destroy();
  previousComponent = null;
}

function createSlotFn(element) {
  return [function createSlot() {
    return {
      c: _internal.noop,
      m: function mount(target, anchor) {
        (0, _internal.insert)(target, element, anchor);
      },
      d: function destroy(detaching) {
        if (detaching) {
          (0, _internal.detach)(element);
        }
      },
      l: _internal.noop
    };
  }];
}

function createSlots(slots) {
  return Object.entries(slots).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        slotName = _ref2[0],
        element = _ref2[1];

    acc[slotName] = createSlotFn(element);
    return acc;
  }, {});
}

function mountView(_ref3) {
  var Component = _ref3.Component,
      target = _ref3.target,
      props = _ref3.props,
      on = _ref3.on,
      Wrapper = _ref3.Wrapper,
      WrapperData = _ref3.WrapperData;
  var component;

  if (Wrapper) {
    var fragment = _global.document.createDocumentFragment();

    component = new Component({
      target: fragment,
      props: props
    });
    var wrapper = new Wrapper({
      target: target,
      props: Object.assign({}, WrapperData, {
        $$slots: createSlots({
          default: fragment
        }),
        $$scope: {}
      })
    });
    component.$on('destroy', function () {
      wrapper.$destroy(true);
    });
  } else {
    component = new Component({
      target: target,
      props: props
    });
  }

  if (on) {
    // Attach svelte event listeners.
    Object.keys(on).forEach(function (eventName) {
      component.$on(eventName, on[eventName]);
    });
  }

  previousComponent = component;
}

function render(_ref4) {
  var storyFn = _ref4.storyFn,
      kind = _ref4.kind,
      name = _ref4.name,
      showMain = _ref4.showMain,
      showError = _ref4.showError;

  var _storyFn = storyFn(),
      Component = _storyFn.Component,
      props = _storyFn.props,
      on = _storyFn.on,
      Wrapper = _storyFn.Wrapper,
      WrapperData = _storyFn.WrapperData;

  cleanUpPreviousStory();
  var DefaultCompatComponent = Component ? Component.default || Component : undefined;
  var DefaultCompatWrapper = Wrapper ? Wrapper.default || Wrapper : undefined;

  if (!DefaultCompatComponent) {
    showError({
      title: "Expecting a Svelte component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _tsDedent.default)(_templateObject())
    });
    return;
  }

  var target = _global.document.getElementById('root');

  target.innerHTML = '';
  mountView({
    Component: DefaultCompatComponent,
    target: target,
    props: props,
    on: on,
    Wrapper: DefaultCompatWrapper,
    WrapperData: WrapperData
  });
  showMain();
}