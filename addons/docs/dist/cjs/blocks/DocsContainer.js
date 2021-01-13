"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsContainer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _global = require("global");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _react2 = require("@mdx-js/react");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

var _Anchor = require("./Anchor");

var _Story = require("./Story");

var _SourceContainer = require("./SourceContainer");

var _mdx = require("./mdx");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    Deprecated parameter: options.theme => docs.theme\n    \n    https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/theming.md#storybook-theming\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var defaultComponents = Object.assign({}, _components.components, {
  code: _mdx.CodeOrSourceMdx,
  a: _mdx.AnchorMdx
}, _mdx.HeadersMdx);
var warnOptionsTheme = (0, _utilDeprecate.default)(function () {}, (0, _tsDedent.default)(_templateObject()));

var DocsContainer = function DocsContainer(_ref) {
  var context = _ref.context,
      children = _ref.children;

  var _ref2 = context || {},
      _ref2$id = _ref2.id,
      storyId = _ref2$id === void 0 ? null : _ref2$id,
      _ref2$parameters = _ref2.parameters,
      parameters = _ref2$parameters === void 0 ? {} : _ref2$parameters;

  var _parameters$options = parameters.options,
      options = _parameters$options === void 0 ? {} : _parameters$options,
      _parameters$docs = parameters.docs,
      docs = _parameters$docs === void 0 ? {} : _parameters$docs;
  var themeVars = docs.theme;

  if (!themeVars && options.theme) {
    warnOptionsTheme();
    themeVars = options.theme;
  }

  var theme = (0, _theming.ensure)(themeVars);
  var allComponents = Object.assign({}, defaultComponents, docs.components);
  (0, _react.useEffect)(function () {
    var url;

    try {
      url = new URL(_global.window.parent.location);
    } catch (err) {
      return;
    }

    if (url.hash) {
      var element = _global.document.getElementById(url.hash.substring(1));

      if (element) {
        // Introducing a delay to ensure scrolling works when it's a full refresh.
        setTimeout(function () {
          (0, _utils.scrollToElement)(element);
        }, 200);
      }
    } else {
      var _element = _global.document.getElementById((0, _Anchor.anchorBlockIdFromId)(storyId)) || _global.document.getElementById((0, _Story.storyBlockIdFromId)(storyId));

      if (_element) {
        var allStories = _element.parentElement.querySelectorAll('[id|="anchor-"]');

        var scrollTarget = _element;

        if (allStories && allStories[0] === _element) {
          // Include content above first story
          scrollTarget = _global.document.getElementById('docs-root');
        } // Introducing a delay to ensure scrolling works when it's a full refresh.


        setTimeout(function () {
          (0, _utils.scrollToElement)(scrollTarget, 'start');
        }, 200);
      }
    }
  }, [storyId]);
  return /*#__PURE__*/_react.default.createElement(_DocsContext.DocsContext.Provider, {
    value: context
  }, /*#__PURE__*/_react.default.createElement(_SourceContainer.SourceContainer, null, /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_react2.MDXProvider, {
    components: allComponents
  }, /*#__PURE__*/_react.default.createElement(_components.DocsWrapper, {
    className: "sbdocs sbdocs-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_components.DocsContent, {
    className: "sbdocs sbdocs-content"
  }, children))))));
};

exports.DocsContainer = DocsContainer;