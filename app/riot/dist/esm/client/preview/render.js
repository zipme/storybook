import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the component snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { document } from 'global';
import dedent from 'ts-dedent';
import { unregister } from 'riot';
import { render as renderRiot } from './rendering';
export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      _ref$showMain = _ref.showMain,
      showMain = _ref$showMain === void 0 ? function () {} : _ref$showMain,
      _ref$showError = _ref.showError,
      showError = _ref$showError === void 0 ? function () {} : _ref$showError;
  showMain();
  unregister('#root');
  var rootElement = document.getElementById('root');
  rootElement.innerHTML = '';
  rootElement.dataset.is = 'root';
  var element = storyFn();
  var rendered = renderRiot(element);

  if (!rendered) {
    showError({
      title: "Expecting a riot snippet or a riot component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: dedent(_templateObject())
    });
  }

  return rendered;
}