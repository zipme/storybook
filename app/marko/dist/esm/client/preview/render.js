import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the component from the story?\n        Use \"() => ({ component: MyComponent, input: { hello: 'world' } })\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { document } from 'global';
import dedent from 'ts-dedent';
import { logger } from '@storybook/client-logger';
var rootEl = document.getElementById('root');
var activeComponent = null; // currently loaded marko component.

var activeTemplate = null; // template for the currently loaded component.

var activeStoryFn = null; // used to determine if we've switched stories.

export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError,
      parameters = _ref.parameters;
  var isSameStory = activeStoryFn === storyFn;
  var config = storyFn();
  activeStoryFn = storyFn;

  if (!config || !(config.appendTo || config.component || parameters.component)) {
    showError({
      title: "Expecting an object with a component property to be returned from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: dedent(_templateObject())
    });
    return;
  }

  if (config.appendTo) {
    logger.warn('@storybook/marko: returning a rendered component for a story is deprecated, return an object with `{ component, input }` instead.'); // The deprecated API always destroys the previous component instance.

    if (activeComponent) {
      activeComponent.destroy();
    }

    activeComponent = config.appendTo(rootEl).getComponent();
  } else {
    var template = config.component || parameters.component;

    if (isSameStory && activeTemplate === template) {
      // When rendering the same template with new input, we reuse the same instance.
      activeComponent.input = config.input;
      activeComponent.update();
    } else {
      if (activeComponent) {
        activeComponent.destroy();
      }

      activeTemplate = template;
      activeComponent = activeTemplate.renderSync(config.input).appendTo(rootEl).getComponent();
    }
  }

  showMain();
}