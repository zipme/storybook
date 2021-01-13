import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.freeze";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.for-each";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      StoryFn.parameters.jsx.onBeforeRender was deprecated.\n      Prefer StoryFn.parameters.jsx.transformSource instead.\n      See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-onbeforerender for details.\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
import { addons } from '@storybook/addons';
import { logger } from '@storybook/client-logger';
import { SourceType, SNIPPET_RENDERED } from '../../shared';
import { getDocgenSection } from '../../lib/docgen';
import { isMemo, isForwardRef } from './lib';

/** Run the user supplied onBeforeRender function if it exists */
var applyBeforeRender = function applyBeforeRender(domString, options) {
  if (typeof options.onBeforeRender !== 'function') {
    return domString;
  }

  var deprecatedOnBeforeRender = deprecate(options.onBeforeRender, dedent(_templateObject()));
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


export var renderJsx = function renderJsx(code, options) {
  if (typeof code === 'undefined') {
    logger.warn('Too many skip or undefined component');
    return null;
  }

  var renderedJSX = code;
  var Type = renderedJSX.type;

  for (var i = 0; i < options.skip; i += 1) {
    if (typeof renderedJSX === 'undefined') {
      logger.warn('Cannot skip undefined element');
      return null;
    }

    if (React.Children.count(renderedJSX) > 1) {
      logger.warn('Trying to skip an array of elements');
      return null;
    }

    if (typeof renderedJSX.props.children === 'undefined') {
      logger.warn('Not enough children to skip elements.');

      if (typeof Type === 'function' && Type.name === '') {
        // @ts-ignore
        renderedJSX = /*#__PURE__*/React.createElement(Type, renderedJSX.props);
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
      return el.type.displayName || getDocgenSection(el.type, 'displayName') || (el.type.name !== '_default' ? el.type.name : null) || (typeof el.type === 'function' ? 'No Display Name' : null) || (isForwardRef(el.type) ? el.type.render.name : null) || (isMemo(el.type) ? el.type.type.name : null) || el.type;
    }
  };
  var filterDefaults = {
    filterProps: function filterProps(value, key) {
      return value !== undefined;
    }
  };
  var opts = Object.assign({}, displayNameDefaults, filterDefaults, options);
  var result = React.Children.map(code, function (c) {
    // @ts-ignore FIXME: workaround react-element-to-jsx-string
    var child = typeof c === 'number' ? c.toString() : c;
    var string = applyBeforeRender(reactElementToJSXString(child, opts), options);
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
var defaultOpts = {
  skip: 0,
  showFunctions: false,
  enableBeautify: true,
  showDefaultProps: false
};
export var skipJsxRender = function skipJsxRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};
export var jsxDecorator = function jsxDecorator(storyFn, context) {
  var story = storyFn(); // We only need to render JSX if the source block is actually going to
  // consume it. Otherwise it's just slowing us down.

  if (skipJsxRender(context)) {
    return story;
  }

  var channel = addons.getChannel();
  var options = Object.assign({}, defaultOpts, (context === null || context === void 0 ? void 0 : context.parameters.jsx) || {});
  var jsx = '';
  var rendered = renderJsx(story, options);

  if (rendered) {
    jsx = applyTransformSource(rendered, options, context);
  }

  channel.emit(SNIPPET_RENDERED, (context || {}).id, jsx);
  return story;
};