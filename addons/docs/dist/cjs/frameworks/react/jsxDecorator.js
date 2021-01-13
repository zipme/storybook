"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsxDecorator = exports.skipJsxRender = exports.renderJsx = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactElementToJsxString = _interopRequireDefault(require("react-element-to-jsx-string"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _addons = require("@storybook/addons");

var _clientLogger = require("@storybook/client-logger");

var _shared = require("../../shared");

var _docgen = require("../../lib/docgen");

var _lib = require("./lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      StoryFn.parameters.jsx.onBeforeRender was deprecated.\n      Prefer StoryFn.parameters.jsx.transformSource instead.\n      See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-onbeforerender for details.\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** Run the user supplied onBeforeRender function if it exists */
var applyBeforeRender = function applyBeforeRender(domString, options) {
  if (typeof options.onBeforeRender !== 'function') {
    return domString;
  }

  var deprecatedOnBeforeRender = (0, _utilDeprecate.default)(options.onBeforeRender, (0, _tsDedent.default)(_templateObject()));
  return deprecatedOnBeforeRender(domString);
};
/** Run the user supplied transformSource function if it exists */


var applyTransformSource = function applyTransformSource(domString, options, context) {
  if (typeof options.transformSource !== 'function') {
    return domString;
  }

  return options.transformSource(domString, context);
};
/** Apply the users parameters and render the jsx for a story */


var renderJsx = function renderJsx(code, options) {
  if (typeof code === 'undefined') {
    _clientLogger.logger.warn('Too many skip or undefined component');

    return null;
  }

  var renderedJSX = code;
  var Type = renderedJSX.type;

  for (var i = 0; i < options.skip; i += 1) {
    if (typeof renderedJSX === 'undefined') {
      _clientLogger.logger.warn('Cannot skip undefined element');

      return null;
    }

    if (_react.default.Children.count(renderedJSX) > 1) {
      _clientLogger.logger.warn('Trying to skip an array of elements');

      return null;
    }

    if (typeof renderedJSX.props.children === 'undefined') {
      _clientLogger.logger.warn('Not enough children to skip elements.');

      if (typeof Type === 'function' && Type.name === '') {
        // @ts-ignore
        renderedJSX = /*#__PURE__*/_react.default.createElement(Type, renderedJSX.props);
      }
    } else if (typeof renderedJSX.props.children === 'function') {
      renderedJSX = renderedJSX.props.children();
    } else {
      renderedJSX = renderedJSX.props.children;
    }
  }

  var displayNameDefaults = typeof options.displayName === 'string' ? {
    showFunctions: true,
    displayName: function displayName() {
      return options.displayName;
    }
  } : {
    // To get exotic component names resolving properly
    displayName: function displayName(el) {
      return el.type.displayName || (0, _docgen.getDocgenSection)(el.type, 'displayName') || (el.type.name !== '_default' ? el.type.name : null) || (typeof el.type === 'function' ? 'No Display Name' : null) || ((0, _lib.isForwardRef)(el.type) ? el.type.render.name : null) || ((0, _lib.isMemo)(el.type) ? el.type.type.name : null) || el.type;
    }
  };
  var filterDefaults = {
    filterProps: function filterProps(value, key) {
      return value !== undefined;
    }
  };
  var opts = Object.assign({}, displayNameDefaults, filterDefaults, options);

  var result = _react.default.Children.map(code, function (c) {
    // @ts-ignore FIXME: workaround react-element-to-jsx-string
    var child = typeof c === 'number' ? c.toString() : c;
    var string = applyBeforeRender((0, _reactElementToJsxString.default)(child, opts), options);
    var matches = string.match(/\S+=\\"([^"]*)\\"/g);

    if (matches) {
      matches.forEach(function (match) {
        string = string.replace(match, match.replace(/&quot;/g, "'"));
      });
    }

    return string;
  }).join('\n');

  return result.replace(/function\s+noRefCheck\(\)\s+\{\}/, '() => {}');
};

exports.renderJsx = renderJsx;
var defaultOpts = {
  skip: 0,
  showFunctions: false,
  enableBeautify: true,
  showDefaultProps: false
};

var skipJsxRender = function skipJsxRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.CODE;
};

exports.skipJsxRender = skipJsxRender;

var jsxDecorator = function jsxDecorator(storyFn, context) {
  var story = storyFn(); // We only need to render JSX if the source block is actually going to
  // consume it. Otherwise it's just slowing us down.

  if (skipJsxRender(context)) {
    return story;
  }

  var channel = _addons.addons.getChannel();

  var options = Object.assign({}, defaultOpts, (context === null || context === void 0 ? void 0 : context.parameters.jsx) || {});
  var jsx = '';
  var rendered = renderJsx(story, options);

  if (rendered) {
    jsx = applyTransformSource(rendered, options, context);
  }

  channel.emit(_shared.SNIPPET_RENDERED, (context || {}).id, jsx);
  return story;
};

exports.jsxDecorator = jsxDecorator;