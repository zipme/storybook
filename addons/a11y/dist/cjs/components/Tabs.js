"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.string.bold");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;

var React = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _reactSizeme = require("react-sizeme");

var _HighlightToggle = _interopRequireDefault(require("./Report/HighlightToggle"));

var _A11yContext = require("./A11yContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: reuse the Tabs component from @storybook/theming instead of re-building identical functionality
var Container = _theming.styled.div({
  width: '100%',
  position: 'relative',
  minHeight: '100%'
});

var HighlightToggleLabel = _theming.styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    cursor: 'pointer',
    userSelect: 'none',
    marginBottom: 3,
    marginRight: 3,
    color: theme.color.dark
  };
});

var GlobalToggle = _theming.styled.div(function (_ref2) {
  var elementWidth = _ref2.elementWidth;
  var maxWidthBeforeBreak = 450;
  return {
    cursor: 'pointer',
    fontSize: '14px',
    padding: elementWidth > maxWidthBeforeBreak ? '12px 15px 10px 0' : '12px 0px 3px 12px',
    height: '40px',
    border: 'none',
    marginTop: elementWidth > maxWidthBeforeBreak ? -40 : 0,
    float: elementWidth > maxWidthBeforeBreak ? 'right' : 'left',
    display: elementWidth > maxWidthBeforeBreak ? 'flex' : 'block',
    alignItems: 'center',
    width: elementWidth > maxWidthBeforeBreak ? 'auto' : '100%',
    borderBottom: elementWidth > maxWidthBeforeBreak ? 'none' : '1px solid rgba(0,0,0,.1)',
    input: {
      marginLeft: 10,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0
    }
  };
});

var Item = _theming.styled.button(function (_ref3) {
  var theme = _ref3.theme;
  return {
    textDecoration: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: 1,
    height: 40,
    border: 'none',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    background: 'transparent',
    '&:focus': {
      outline: '0 none',
      borderBottom: "3px solid ".concat(theme.color.secondary)
    }
  };
}, function (_ref4) {
  var active = _ref4.active,
      theme = _ref4.theme;
  return active ? {
    opacity: 1,
    borderBottom: "3px solid ".concat(theme.color.secondary)
  } : {};
});

var TabsWrapper = _theming.styled.div({});

var List = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return {
    boxShadow: "".concat(theme.appBorderColor, " 0 -1px 0 0 inset"),
    background: 'rgba(0, 0, 0, .05)',
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
  };
});

function retrieveAllNodesFromResults(items) {
  return items.reduce(function (acc, item) {
    return acc.concat(item.nodes);
  }, []);
}

var Tabs = function Tabs(_ref6) {
  var tabs = _ref6.tabs;

  var _useA11yContext = (0, _A11yContext.useA11yContext)(),
      activeTab = _useA11yContext.tab,
      setTab = _useA11yContext.setTab;

  var handleToggle = React.useCallback(function (event) {
    setTab(parseInt(event.currentTarget.getAttribute('data-index') || '', 10));
  }, [setTab]);
  var highlightToggleId = "".concat(tabs[activeTab].type, "-global-checkbox");
  var highlightLabel = "Highlight results";
  return /*#__PURE__*/React.createElement(_reactSizeme.SizeMe, {
    refreshMode: "debounce"
  }, function (_ref7) {
    var size = _ref7.size;
    return /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(List, null, /*#__PURE__*/React.createElement(TabsWrapper, null, tabs.map(function (tab, index) {
      return /*#__PURE__*/React.createElement(Item
      /* eslint-disable-next-line react/no-array-index-key */
      , {
        key: index,
        "data-index": index,
        active: activeTab === index,
        onClick: handleToggle
      }, tab.label);
    }))), tabs[activeTab].items.length > 0 ? /*#__PURE__*/React.createElement(GlobalToggle, {
      elementWidth: size.width || 0
    }, /*#__PURE__*/React.createElement(HighlightToggleLabel, {
      htmlFor: highlightToggleId
    }, highlightLabel), /*#__PURE__*/React.createElement(_HighlightToggle.default, {
      toggleId: highlightToggleId,
      elementsToHighlight: retrieveAllNodesFromResults(tabs[activeTab].items)
    })) : null, tabs[activeTab].panel);
  });
};

exports.Tabs = Tabs;