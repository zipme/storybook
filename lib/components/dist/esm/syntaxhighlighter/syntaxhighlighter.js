import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reduce";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.entries";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.trim";
import "core-js/modules/web.dom-collections.iterator";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { logger } from '@storybook/client-logger';
import { styled } from '@storybook/theming';
import { navigator, window } from 'global';
import memoize from 'memoizerific'; // @ts-ignore

import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'; // @ts-ignore

import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'; // @ts-ignore

import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'; // @ts-ignore

import jsExtras from 'react-syntax-highlighter/dist/cjs/languages/prism/js-extras'; // @ts-ignore

import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'; // @ts-ignore

import graphql from 'react-syntax-highlighter/dist/cjs/languages/prism/graphql'; // @ts-ignore

import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'; // @ts-ignore

import md from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'; // @ts-ignore

import yml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml'; // @ts-ignore

import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'; // @ts-ignore

import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'; // @ts-ignore

import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light';
import { ActionBar } from '../ActionBar/ActionBar';
import { ScrollArea } from '../ScrollArea/ScrollArea';
import { formatter } from './formatter';
ReactSyntaxHighlighter.registerLanguage('jsextra', jsExtras);
ReactSyntaxHighlighter.registerLanguage('jsx', jsx);
ReactSyntaxHighlighter.registerLanguage('json', json);
ReactSyntaxHighlighter.registerLanguage('yml', yml);
ReactSyntaxHighlighter.registerLanguage('md', md);
ReactSyntaxHighlighter.registerLanguage('bash', bash);
ReactSyntaxHighlighter.registerLanguage('css', css);
ReactSyntaxHighlighter.registerLanguage('html', html);
ReactSyntaxHighlighter.registerLanguage('tsx', tsx);
ReactSyntaxHighlighter.registerLanguage('typescript', typescript);
ReactSyntaxHighlighter.registerLanguage('graphql', graphql);
var themedSyntax = memoize(2)(function (theme) {
  return Object.entries(theme.code || {}).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return Object.assign({}, acc, _defineProperty({}, "* .".concat(key), val));
  }, {});
});
var Wrapper = styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'relative',
    overflow: 'hidden',
    color: theme.color.defaultText
  };
}, function (_ref4) {
  var theme = _ref4.theme,
      bordered = _ref4.bordered;
  return bordered ? {
    border: "1px solid ".concat(theme.appBorderColor),
    borderRadius: theme.borderRadius,
    background: theme.background.content
  } : {};
});
var Scroller = styled(function (_ref5) {
  var children = _ref5.children,
      className = _ref5.className;
  return /*#__PURE__*/React.createElement(ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  position: 'relative'
}, function (_ref6) {
  var theme = _ref6.theme;
  return {
    '& code': {
      paddingRight: theme.layoutMargin
    }
  };
}, function (_ref7) {
  var theme = _ref7.theme;
  return themedSyntax(theme);
});
var Pre = styled.pre(function (_ref8) {
  var theme = _ref8.theme,
      padded = _ref8.padded;
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: 0,
    padding: padded ? theme.layoutMargin : 0
  };
});
var Code = styled.code({
  flex: 1,
  paddingRight: 0,
  opacity: 1
});
export var SyntaxHighlighter = function SyntaxHighlighter(_ref9) {
  var children = _ref9.children,
      _ref9$language = _ref9.language,
      language = _ref9$language === void 0 ? 'jsx' : _ref9$language,
      _ref9$copyable = _ref9.copyable,
      copyable = _ref9$copyable === void 0 ? false : _ref9$copyable,
      _ref9$bordered = _ref9.bordered,
      bordered = _ref9$bordered === void 0 ? false : _ref9$bordered,
      _ref9$padded = _ref9.padded,
      padded = _ref9$padded === void 0 ? false : _ref9$padded,
      _ref9$format = _ref9.format,
      format = _ref9$format === void 0 ? true : _ref9$format,
      _ref9$className = _ref9.className,
      className = _ref9$className === void 0 ? null : _ref9$className,
      _ref9$showLineNumbers = _ref9.showLineNumbers,
      showLineNumbers = _ref9$showLineNumbers === void 0 ? false : _ref9$showLineNumbers,
      rest = _objectWithoutProperties(_ref9, ["children", "language", "copyable", "bordered", "padded", "format", "className", "showLineNumbers"]);

  if (typeof children !== 'string' || !children.trim()) {
    return null;
  }

  var highlightableCode = format ? formatter(children) : children.trim();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      copied = _useState2[0],
      setCopied = _useState2[1];

  var onClick = function onClick(e) {
    e.preventDefault();
    navigator.clipboard.writeText(highlightableCode).then(function () {
      setCopied(true);
      window.setTimeout(function () {
        return setCopied(false);
      }, 1500);
    }).catch(logger.error);
  };

  return /*#__PURE__*/React.createElement(Wrapper, {
    bordered: bordered,
    padded: padded,
    className: className
  }, /*#__PURE__*/React.createElement(Scroller, null, /*#__PURE__*/React.createElement(ReactSyntaxHighlighter, _extends({
    padded: padded || bordered,
    language: language,
    showLineNumbers: showLineNumbers,
    showInlineLineNumbers: showLineNumbers,
    useInlineStyles: false,
    PreTag: Pre,
    CodeTag: Code,
    lineNumberContainerStyle: {}
  }, rest), highlightableCode)), copyable ? /*#__PURE__*/React.createElement(ActionBar, {
    actionItems: [{
      title: copied ? 'Copied' : 'Copy',
      onClick: onClick
    }]
  }) : null);
};
SyntaxHighlighter.displayName = "SyntaxHighlighter";
export default SyntaxHighlighter;