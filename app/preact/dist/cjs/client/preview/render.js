"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderMain;

var preact = _interopRequireWildcard(require("preact"));

var _global = require("global");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Preact element from the story?\n        Use \"() => (<MyComp/>)\" or \"() => { return <MyComp/>; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootElement = _global.document ? _global.document.getElementById('root') : null;
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

function renderMain(_ref) {
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
      description: (0, _tsDedent.default)(_templateObject())
    });
    return;
  } // But forceRender means that it's the same story, so we want to keep the state in that case.


  if (!forceRender) {
    preactRender(null);
  }

  showMain();
  preactRender(element);
}