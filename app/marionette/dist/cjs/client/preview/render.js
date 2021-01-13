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

var _commonTags = require("common-tags");

var _backbone = _interopRequireDefault(require("backbone.marionette"));

var _element_check = _interopRequireDefault(require("./element_check"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var rootEl = _global.document.getElementById('root');

var rootRegion = new _backbone.default.Region({
  el: rootEl
});

function render(view) {
  rootRegion.show(view);
}

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      kind = _ref.kind,
      name = _ref.name,
      showMain = _ref.showMain,
      showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Marionette View from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  if (!(0, _element_check.default)(element)) {
    showError({
      title: "Expecting a valid Marionette View from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject2())
    });
    return;
  }

  render(element);
  showMain();
}