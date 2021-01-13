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

var _riot = require("riot");

var _rendering = require("./rendering");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the component snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      _ref$showMain = _ref.showMain,
      showMain = _ref$showMain === void 0 ? function () {} : _ref$showMain,
      _ref$showError = _ref.showError,
      showError = _ref$showError === void 0 ? function () {} : _ref$showError;
  showMain();
  (0, _riot.unregister)('#root');

  var rootElement = _global.document.getElementById('root');

  rootElement.innerHTML = '';
  rootElement.dataset.is = 'root';
  var element = storyFn();
  var rendered = (0, _rendering.render)(element);

  if (!rendered) {
    showError({
      title: "Expecting a riot snippet or a riot component from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _tsDedent.default)(_templateObject())
    });
  }

  return rendered;
}