import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import React from 'react';
import addons from '@storybook/addons';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SELECT_STORY } from '@storybook/core-events';
import LinkTo from './link';
jest.mock('@storybook/addons');
jest.mock('global', function () {
  return {
    document: {
      location: {
        origin: 'origin',
        pathname: 'pathname',
        search: 'search'
      }
    },
    // @ts-ignore
    window: global,
    __STORYBOOK_STORY_STORE__: {
      getSelection: jest.fn(function () {
        return {
          id: 1
        };
      }),
      fromId: jest.fn(function () {
        return {};
      })
    }
  };
});

var mockChannel = function mockChannel() {
  return {
    emit: jest.fn(),
    on: jest.fn(),
    once: jest.fn()
  };
};

var mockAddons = addons;
describe('LinkTo', function () {
  describe('render', function () {
    it('should render a link', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var channel, _render, container;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              channel = mockChannel();
              mockAddons.getChannel.mockReturnValue(channel);
              _render = render( /*#__PURE__*/React.createElement(LinkTo, {
                kind: "foo",
                story: "bar"
              }, "link")), container = _render.container;
              _context.next = 5;
              return waitFor(function () {
                expect(screen.getByText('link')).toHaveAttribute('href', 'originpathname?search=&id=foo--bar');
              });

            case 5:
              expect(container.firstChild).toMatchInlineSnapshot("\n        <a\n          href=\"originpathname?search=&id=foo--bar\"\n        >\n          link\n        </a>\n      ");

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
  describe('events', function () {
    it('should select the kind and story on click', function () {
      var channel = {
        emit: jest.fn(),
        on: jest.fn()
      };
      mockAddons.getChannel.mockReturnValue(channel);
      render( /*#__PURE__*/React.createElement(LinkTo, {
        kind: "foo",
        story: "bar"
      }, "link"));
      userEvent.click(screen.getByText('link'));
      expect(channel.emit).toHaveBeenLastCalledWith(SELECT_STORY, expect.objectContaining({
        kind: 'foo',
        story: 'bar'
      }));
    });
  });
});