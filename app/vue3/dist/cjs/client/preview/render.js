"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.app = exports.propsContainer = void 0;

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _vue = require("vue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Vue component from the story?\n        Use \"() => ({ template: '<my-comp></my-comp>' })\" or \"() => ({ components: MyComp, template: '<my-comp></my-comp>' })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var activeComponent = (0, _vue.shallowRef)(null);
var propsContainer = (0, _vue.reactive)({
  props: {}
});
exports.propsContainer = propsContainer;
var app = (0, _vue.createApp)({
  setup: function setup() {
    return function () {
      if (!activeComponent.value) throw new Error('Component is not set correctly');
      return (0, _vue.h)(activeComponent.value, propsContainer.props);
    };
  }
});
exports.app = app;
var appVm = null;

function render(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      args = _ref.args,
      showMain = _ref.showMain,
      showError = _ref.showError,
      showException = _ref.showException;
  app.config.errorHandler = showException;
  var element = storyFn();
  propsContainer.props = args;

  if (!element) {
    showError({
      title: "Expecting a Vue component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _tsDedent.default)(_templateObject())
    });
    return;
  }

  showMain();
  activeComponent.value = element;

  if (!appVm) {
    appVm = app.mount('#root');
  }
}