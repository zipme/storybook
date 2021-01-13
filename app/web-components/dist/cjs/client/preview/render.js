"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderMain;

var _global = require("global");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _litHtml = require("lit-html");

var _clientApi = require("@storybook/client-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the HTML snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootElement = _global.document.getElementById('root');

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError,
      forceRender = _ref.forceRender;
  var element = storyFn();
  showMain();

  if (element instanceof _litHtml.TemplateResult) {
    // `render` stores the TemplateInstance in the Node and tries to update based on that.
    // Since we reuse `rootElement` for all stories, remove the stored instance first.
    // But forceRender means that it's the same story, so we want too keep the state in that case.
    if (!forceRender || !rootElement.querySelector('[id="root-inner"]')) {
      rootElement.innerHTML = '<div id="root-inner"></div>';
    }

    var renderTo = rootElement.querySelector('[id="root-inner"]');
    (0, _litHtml.render)(element, renderTo);
    (0, _clientApi.simulatePageLoad)(rootElement);
  } else if (typeof element === 'string') {
    rootElement.innerHTML = element;
    (0, _clientApi.simulatePageLoad)(rootElement);
  } else if (element instanceof _global.Node) {
    // Don't re-mount the element if it didn't change and neither did the story
    if (rootElement.firstChild === element && forceRender === true) {
      return;
    }

    rootElement.innerHTML = '';
    rootElement.appendChild(element);
    (0, _clientApi.simulateDOMContentLoaded)();
  } else {
    showError({
      title: "Expecting an HTML snippet or DOM node from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _tsDedent.default)(_templateObject())
    });
  }
}