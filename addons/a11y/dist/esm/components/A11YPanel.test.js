import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, themes, convert } from '@storybook/theming';
import * as api from '@storybook/api';
import { A11YPanel } from './A11YPanel';
import { EVENTS } from '../constants';
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
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: convert(themes.light)
  }, /*#__PURE__*/React.createElement(A11YPanel, null));
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
    mockedApi.useAddonState.mockImplementation(React.useState);
  });
  it('should render', function () {
    var _render = render( /*#__PURE__*/React.createElement(A11YPanel, null)),
        container = _render.container;

    expect(container.firstChild).toBeTruthy();
  });
  it('should register event listener on mount', function () {
    var _expect$objectContain;

    render( /*#__PURE__*/React.createElement(A11YPanel, null));
    expect(mockedApi.useChannel).toHaveBeenCalledWith(expect.objectContaining((_expect$objectContain = {}, _defineProperty(_expect$objectContain, EVENTS.RESULT, expect.any(Function)), _defineProperty(_expect$objectContain, EVENTS.ERROR, expect.any(Function)), _expect$objectContain)));
  });
  it('should handle "initial" status', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(A11YPanel, null)),
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
            _render3 = render( /*#__PURE__*/React.createElement(ThemedA11YPanel, null)), getByText = _render3.getByText;
            _context.next = 4;
            return waitFor(function () {
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
              _render4 = render( /*#__PURE__*/React.createElement(ThemedA11YPanel, null)), getByRole = _render4.getByRole, getByText = _render4.getByText;
              _context2.next = 6;
              return waitFor(function () {
                var button = getByRole('button', {
                  name: 'Run test'
                });
                fireEvent.click(button);
              });

            case 6:
              _context2.next = 8;
              return waitFor(function () {
                expect(getByText(/Please wait while the accessibility scan is running/)).toBeTruthy();
                expect(emit).toHaveBeenCalledWith(EVENTS.MANUAL, 'jest');
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
              _render5 = render( /*#__PURE__*/React.createElement(ThemedA11YPanel, null)), getByText = _render5.getByText;
              useChannelArgs = mockedApi.useChannel.mock.calls[0][0];
              act(function () {
                return useChannelArgs[EVENTS.RUNNING]();
              });
              _context3.next = 5;
              return waitFor(function () {
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
            _render6 = render( /*#__PURE__*/React.createElement(ThemedA11YPanel, null)), getByText = _render6.getByText;
            useChannelArgs = mockedApi.useChannel.mock.calls[0][0];
            act(function () {
              return useChannelArgs[EVENTS.RESULT](axeResult);
            });
            _context4.next = 5;
            return waitFor(function () {
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