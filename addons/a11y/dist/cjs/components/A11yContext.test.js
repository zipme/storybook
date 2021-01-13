"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

var _react2 = require("@testing-library/react");

var api = _interopRequireWildcard(require("@storybook/api"));

var _coreEvents = require("@storybook/core-events");

var _A11yContext = require("./A11yContext");

var _constants = require("../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

jest.mock('@storybook/api');
var mockedApi = api;
var storyId = 'jest';
var axeResult = {
  incomplete: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: [],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }],
  passes: [{
    id: 'aria-allowed-attr',
    impact: undefined,
    tags: [],
    description: "Ensures ARIA attributes are allowed for an element's role",
    help: 'Elements must only use allowed ARIA attributes',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/aria-allowed-attr?application=axeAPI',
    nodes: []
  }],
  violations: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: [],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }]
};
describe('A11YPanel', function () {
  beforeEach(function () {
    mockedApi.useChannel.mockReset();
    mockedApi.useStorybookState.mockReset();
    mockedApi.useChannel.mockReturnValue(jest.fn());
    var state = {
      storyId: storyId
    }; // Lazy to mock entire state

    mockedApi.useStorybookState.mockReturnValue(state);
  });
  it('should render children', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: true
    }, /*#__PURE__*/React.createElement("div", {
      "data-testid": "child"
    }))),
        getByTestId = _render.getByTestId;

    expect(getByTestId('child')).toBeTruthy();
  });
  it('should not render when inactive', function () {
    var emit = jest.fn();
    mockedApi.useChannel.mockReturnValue(emit);

    var _render2 = (0, _react2.render)( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: false
    }, /*#__PURE__*/React.createElement("div", {
      "data-testid": "child"
    }))),
        queryByTestId = _render2.queryByTestId;

    expect(queryByTestId('child')).toBeFalsy();
    expect(emit).not.toHaveBeenCalledWith(_constants.EVENTS.REQUEST);
  });
  it('should emit request when moving from inactive to active', function () {
    var emit = jest.fn();
    mockedApi.useChannel.mockReturnValue(emit);

    var _render3 = (0, _react2.render)( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: false
    })),
        rerender = _render3.rerender;

    rerender( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: true
    }));
    expect(emit).toHaveBeenLastCalledWith(_constants.EVENTS.REQUEST, storyId);
  });
  it('should emit highlight with no values when inactive', function () {
    var emit = jest.fn();
    mockedApi.useChannel.mockReturnValue(emit);

    var _render4 = (0, _react2.render)( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: true
    })),
        rerender = _render4.rerender;

    rerender( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: false
    }));
    expect(emit).toHaveBeenLastCalledWith(_constants.EVENTS.HIGHLIGHT, expect.objectContaining({
      color: expect.any(String),
      elements: []
    }));
  });
  it('should emit highlight with no values when story changed', function () {
    var Component = function Component() {
      var _useA11yContext = (0, _A11yContext.useA11yContext)(),
          results = _useA11yContext.results,
          setResults = _useA11yContext.setResults; // As any because of unit tests...


      React.useEffect(function () {
        return setResults(axeResult);
      }, []);
      return /*#__PURE__*/React.createElement(React.Fragment, null, !!results.passes.length && /*#__PURE__*/React.createElement("div", {
        "data-testid": "anyPassesResults"
      }), !!results.incomplete.length && /*#__PURE__*/React.createElement("div", {
        "data-testid": "anyIncompleteResults"
      }), !!results.violations.length && /*#__PURE__*/React.createElement("div", {
        "data-testid": "anyViolationsResults"
      }));
    };

    var _render5 = (0, _react2.render)( /*#__PURE__*/React.createElement(_A11yContext.A11yContextProvider, {
      active: true
    }, /*#__PURE__*/React.createElement(Component, null))),
        queryByTestId = _render5.queryByTestId;

    expect(queryByTestId('anyPassesResults')).toBeTruthy();
    expect(queryByTestId('anyIncompleteResults')).toBeTruthy();
    expect(queryByTestId('anyViolationsResults')).toBeTruthy();
    var useChannelArgs = mockedApi.useChannel.mock.calls[0][0];
    (0, _react2.act)(function () {
      return useChannelArgs[_coreEvents.STORY_CHANGED]();
    });
    expect(queryByTestId('anyPassesResults')).toBeFalsy();
    expect(queryByTestId('anyIncompleteResults')).toBeFalsy();
    expect(queryByTestId('anyViolationsResults')).toBeFalsy();
  });
});