"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _theming = require("@storybook/theming");

var api = _interopRequireWildcard(require("@storybook/api"));

var _A11YPanel = require("./A11YPanel");

var _constants = require("../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jest.mock('@storybook/api');
var mockedApi = api;
var axeResult = {
  incomplete: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: ['cat.color', 'wcag2aa', 'wcag143'],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }],
  passes: [{
    id: 'aria-allowed-attr',
    impact: null,
    tags: ['cat.aria', 'wcag2a', 'wcag412'],
    description: "Ensures ARIA attributes are allowed for an element's role",
    help: 'Elements must only use allowed ARIA attributes',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/aria-allowed-attr?application=axeAPI',
    nodes: []
  }],
  violations: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: ['cat.color', 'wcag2aa', 'wcag143'],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }]
};

function ThemedA11YPanel() {
  return /*#__PURE__*/_react.default.createElement(_theming.ThemeProvider, {
    theme: (0, _theming.convert)(_theming.themes.light)
  }, /*#__PURE__*/_react.default.createElement(_A11YPanel.A11YPanel, null));
}

describe('A11YPanel', function () {
  beforeEach(function () {
    mockedApi.useChannel.mockReset();
    mockedApi.useParameter.mockReset();
    mockedApi.useStorybookState.mockReset();
    mockedApi.useAddonState.mockReset();
    mockedApi.useChannel.mockReturnValue(jest.fn());
    mockedApi.useParameter.mockReturnValue({
      manual: false
    });
    var state = {
      storyId: 'jest'
    }; // Lazy to mock entire state

    mockedApi.useStorybookState.mockReturnValue(state);
    mockedApi.useAddonState.mockImplementation(_react.default.useState);
  });
  it('should render', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_A11YPanel.A11YPanel, null)),
        container = _render.container;

    expect(container.firstChild).toBeTruthy();
  });
  it('should register event listener on mount', function () {
    var _expect$objectContain;

    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_A11YPanel.A11YPanel, null));
    expect(mockedApi.useChannel).toHaveBeenCalledWith(expect.objectContaining((_expect$objectContain = {}, _defineProperty(_expect$objectContain, _constants.EVENTS.RESULT, expect.any(Function)), _defineProperty(_expect$objectContain, _constants.EVENTS.ERROR, expect.any(Function)), _expect$objectContain)));
  });
  it('should handle "initial" status', function () {
    var _render2 = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_A11YPanel.A11YPanel, null)),
        getByText = _render2.getByText;

    expect(getByText(/Initializing/)).toBeTruthy();
  });
  it('should handle "manual" status', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _render3, getByText;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mockedApi.useParameter.mockReturnValue({
              manual: true
            });
            _render3 = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(ThemedA11YPanel, null)), getByText = _render3.getByText;
            _context.next = 4;
            return (0, _react2.waitFor)(function () {
              expect(getByText(/Manually run the accessibility scan/)).toBeTruthy();
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('running', function () {
    it('should handle "running" status', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var emit, _render4, getByRole, getByText;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              emit = jest.fn();
              mockedApi.useChannel.mockReturnValue(emit);
              mockedApi.useParameter.mockReturnValue({
                manual: true
              });
              _render4 = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(ThemedA11YPanel, null)), getByRole = _render4.getByRole, getByText = _render4.getByText;
              _context2.next = 6;
              return (0, _react2.waitFor)(function () {
                var button = getByRole('button', {
                  name: 'Run test'
                });

                _react2.fireEvent.click(button);
              });

            case 6:
              _context2.next = 8;
              return (0, _react2.waitFor)(function () {
                expect(getByText(/Please wait while the accessibility scan is running/)).toBeTruthy();
                expect(emit).toHaveBeenCalledWith(_constants.EVENTS.MANUAL, 'jest');
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should set running status on event', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _render5, getByText, useChannelArgs;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _render5 = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(ThemedA11YPanel, null)), getByText = _render5.getByText;
              useChannelArgs = mockedApi.useChannel.mock.calls[0][0];
              (0, _react2.act)(function () {
                return useChannelArgs[_constants.EVENTS.RUNNING]();
              });
              _context3.next = 5;
              return (0, _react2.waitFor)(function () {
                expect(getByText(/Please wait while the accessibility scan is running/)).toBeTruthy();
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  it('should handle "ran" status', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var _render6, getByText, useChannelArgs;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _render6 = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(ThemedA11YPanel, null)), getByText = _render6.getByText;
            useChannelArgs = mockedApi.useChannel.mock.calls[0][0];
            (0, _react2.act)(function () {
              return useChannelArgs[_constants.EVENTS.RESULT](axeResult);
            });
            _context4.next = 5;
            return (0, _react2.waitFor)(function () {
              expect(getByText(/Tests completed/)).toBeTruthy();
              expect(getByText(/Violations/)).toBeTruthy();
              expect(getByText(/Passes/)).toBeTruthy();
              expect(getByText(/Incomplete/)).toBeTruthy();
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});