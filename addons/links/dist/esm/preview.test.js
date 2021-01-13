import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import addons from '@storybook/addons';
import { SELECT_STORY } from '@storybook/core-events';
import { __STORYBOOK_STORY_STORE__ } from 'global';
import { linkTo, hrefTo } from './preview';
jest.mock('@storybook/addons');
jest.mock('global', function () {
  return {
    // @ts-ignore
    document: global.document,
    __STORYBOOK_STORY_STORE__: {
      getSelection: jest.fn(function () {
        return {
          storyId: 'name',
          kind: 'kind'
        };
      }),
      fromId: jest.fn(function () {
        return {
          story: 'name',
          kind: 'kind'
        };
      })
    },
    // @ts-ignore
    window: global,
    __STORYBOOK_CLIENT_API__: {
      raw: jest.fn(function () {
        return [{
          story: 'name',
          kind: 'kind'
        }, {
          story: 'namekind',
          kind: 'kindname'
        }];
      })
    }
  };
});
var mockAddons = addons;
describe('preview', function () {
  var channel = {
    emit: jest.fn()
  };
  beforeAll(function () {
    mockAddons.getChannel.mockReturnValue(channel);
  });
  beforeEach(channel.emit.mockReset);
  describe('linkTo()', function () {
    it('should select the kind and story provided', function () {
      var handler = linkTo('kind', 'name');
      handler();
      expect(channel.emit).toHaveBeenCalledWith(SELECT_STORY, {
        kind: 'kind',
        story: 'name'
      });
    });
    it('should select the kind (only) provided', function () {
      __STORYBOOK_STORY_STORE__.fromId.mockImplementation(function () {
        return null;
      });

      var handler = linkTo('kind');
      handler();
      expect(channel.emit).toHaveBeenCalledWith(SELECT_STORY, {
        kind: 'kind',
        story: 'name'
      });
    });
    it('should select the story (only) provided', function () {
      // simulate a currently selected, but not found as ID
      __STORYBOOK_STORY_STORE__.fromId.mockImplementation(function (input) {
        return !input ? {
          kind: 'kind',
          story: 'name'
        } : null;
      });

      var handler = linkTo(undefined, 'kind');
      handler();
      expect(channel.emit).toHaveBeenCalledWith(SELECT_STORY, {
        kind: 'kind',
        story: 'name'
      });
    });
    it('should select the id provided', function () {
      __STORYBOOK_STORY_STORE__.fromId.mockImplementation(function (input) {
        return input === 'kind--story' ? {
          story: 'name',
          kind: 'kind'
        } : null;
      });

      var handler = linkTo('kind--story');
      handler();
      expect(channel.emit).toHaveBeenCalledWith(SELECT_STORY, {
        kind: 'kind',
        story: 'name'
      });
    });
    it('should handle functions returning strings', function () {
      __STORYBOOK_STORY_STORE__.fromId.mockImplementation(function (input) {
        return null;
      });

      var handler = linkTo( // @ts-expect-error
      function (a, b) {
        return a + b;
      }, function (a, b) {
        return b + a;
      });
      handler('kind', 'name');
      expect(channel.emit.mock.calls).toContainEqual([SELECT_STORY, {
        kind: 'kindname',
        story: 'namekind'
      }]);
    });
  });
  describe('hrefTo()', function () {
    it('should return promise resolved with story href', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var href;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return hrefTo('kind', 'name');

            case 2:
              href = _context.sent;
              expect(href).toContain('?id=kind--name');

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
  });
});