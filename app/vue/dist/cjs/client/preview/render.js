"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;
exports.VALUES = exports.COMPONENT = void 0;

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Vue component from the story?\n        Use \"() => ({ template: '<my-comp></my-comp>' })\" or \"() => ({ components: MyComp, template: '<my-comp></my-comp>' })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COMPONENT = 'STORYBOOK_COMPONENT';
exports.COMPONENT = COMPONENT;
var VALUES = 'STORYBOOK_VALUES';
exports.VALUES = VALUES;
var root = new _vue.default({
  data: function data() {
    var _ref;

    return _ref = {}, _defineProperty(_ref, COMPONENT, undefined), _defineProperty(_ref, VALUES, {}), _ref;
  },
  render: function render(h) {
    var children = this[COMPONENT] ? [h(this[COMPONENT])] : undefined;
    return h('div', {
      attrs: {
        id: 'root'
      }
    }, children);
  }
});

function render(_ref2) {
  var storyFn = _ref2.storyFn,
      kind = _ref2.kind,
      name = _ref2.name,
      args = _ref2.args,
      showMain = _ref2.showMain,
      showError = _ref2.showError,
      showException = _ref2.showException,
      forceRender = _ref2.forceRender;
  _vue.default.config.errorHandler = showException; // FIXME: move this into root[COMPONENT] = element
  // once we get rid of knobs so we don't have to re-create
  // a new component each time

  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Vue component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _tsDedent.default)(_templateObject())
    });
    return;
  }

  showMain(); // at component creation || refresh by HMR or switching stories

  if (!root[COMPONENT] || !forceRender) {
    root[COMPONENT] = element;
  } // @ts-ignore https://github.com/storybookjs/storrybook/pull/7578#discussion_r307986139


  root[VALUES] = Object.assign({}, element.options[VALUES], args);

  if (!root.$el) {
    root.$mount('#root');
  }
}