import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        Seems like you are not returning a correct Marionette View from the story.\n        Could you double check that?\n      "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the React element from the story?\n        Use \"() => (<MyComp/>)\" or \"() => { return <MyComp/>; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { document } from 'global';
import { stripIndents } from 'common-tags';
import Marionette from 'backbone.marionette';
import isMarionetteRenderable from './element_check';
var rootEl = document.getElementById('root');
var rootRegion = new Marionette.Region({
  el: rootEl
});

function render(view) {
  rootRegion.show(view);
}

export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Marionette View from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: stripIndents(_templateObject())
    });
    return;
  }

  if (!isMarionetteRenderable(element)) {
    showError({
      title: "Expecting a valid Marionette View from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: stripIndents(_templateObject2())
    });
    return;
  }

  render(element);
  showMain();
}