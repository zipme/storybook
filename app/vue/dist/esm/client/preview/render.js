import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Vue component from the story?\n        Use \"() => ({ template: '<my-comp></my-comp>' })\" or \"() => ({ components: MyComp, template: '<my-comp></my-comp>' })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import dedent from 'ts-dedent';
import Vue from 'vue';
export var COMPONENT = 'STORYBOOK_COMPONENT';
export var VALUES = 'STORYBOOK_VALUES';
var root = new Vue({
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
export default function render(_ref2) {
  var storyFn = _ref2.storyFn,
      kind = _ref2.kind,
      name = _ref2.name,
      args = _ref2.args,
      showMain = _ref2.showMain,
      showError = _ref2.showError,
      showException = _ref2.showException,
      forceRender = _ref2.forceRender;
  Vue.config.errorHandler = showException; // FIXME: move this into root[COMPONENT] = element
  // once we get rid of knobs so we don't have to re-create
  // a new component each time

  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Vue component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: dedent(_templateObject())
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