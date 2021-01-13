import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Preact element from the story?\n        Use \"() => (<MyComp/>)\" or \"() => { return <MyComp/>; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as preact from 'preact';
import { document } from 'global';
import dedent from 'ts-dedent';
var rootElement = document ? document.getElementById('root') : null;
var renderedStory;

function preactRender(element) {
  if (preact.Fragment) {
    // Preact 10 only:
    preact.render(element, rootElement);
  } else if (element) {
    renderedStory = preact.render(element, rootElement);
  } else {
    preact.render(element, rootElement, renderedStory);
  }
}

export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError,
      forceRender = _ref.forceRender;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Preact element from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: dedent(_templateObject())
    });
    return;
  } // But forceRender means that it's the same story, so we want to keep the state in that case.


  if (!forceRender) {
    preactRender(null);
  }

  showMain();
  preactRender(element);
}