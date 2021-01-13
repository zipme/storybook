import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Vue component from the story?\n        Use \"() => ({ template: '<my-comp></my-comp>' })\" or \"() => ({ components: MyComp, template: '<my-comp></my-comp>' })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import dedent from 'ts-dedent';
import { createApp, h, shallowRef, reactive } from 'vue';
var activeComponent = shallowRef(null);
export var propsContainer = reactive({
  props: {}
});
export var app = createApp({
  setup: function setup() {
    return function () {
      if (!activeComponent.value) throw new Error('Component is not set correctly');
      return h(activeComponent.value, propsContainer.props);
    };
  }
});
var appVm = null;
export function render(_ref) {
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
      description: dedent(_templateObject())
    });
    return;
  }

  showMain();
  activeComponent.value = element;

  if (!appVm) {
    appVm = app.mount('#root');
  }
}