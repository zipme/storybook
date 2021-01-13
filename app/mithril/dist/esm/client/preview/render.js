import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Mithril element from the story?\n        Use \"() => MyComp\" or \"() => { return MyComp; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { document } from 'global';
/** @jsx m */

import m from 'mithril';
import dedent from 'ts-dedent';
var rootEl = document.getElementById('root');
export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    var error = {
      title: "Expecting a Mithril element from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: dedent(_templateObject())
    };
    showError(error);
    return;
  }

  showMain();
  m.mount(rootEl, {
    view: function view() {
      return m(element);
    }
  });
}