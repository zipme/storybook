"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("regenerator-runtime/runtime");

var _global = require("global");

var _axeCore = _interopRequireDefault(require("axe-core"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

var channel = _addons.default.getChannel(); // Holds axe core running state


var active = false; // Holds latest story we requested a run

var activeStoryId;

var getElement = function getElement() {
  var storyRoot = _global.document.getElementById('story-root');

  return storyRoot ? storyRoot.children : _global.document.getElementById('root');
};
/**
 * Handle A11yContext events.
 * Because the event are sent without manual check, we split calls
 */


var handleRequest = function handleRequest(storyId) {
  var _getParams = getParams(storyId),
      manual = _getParams.manual;

  if (!manual) {
    run(storyId);
  }
};

var run = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(storyId) {
    var input, _input$element, element, config, _input$options, options, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeStoryId = storyId;
            _context.prev = 1;
            input = getParams(storyId);

            if (active) {
              _context.next = 13;
              break;
            }

            active = true;
            channel.emit(_constants.EVENTS.RUNNING);
            _input$element = input.element, element = _input$element === void 0 ? getElement() : _input$element, config = input.config, _input$options = input.options, options = _input$options === void 0 ? {} : _input$options;

            _axeCore.default.reset();

            if (config) {
              _axeCore.default.configure(config);
            }

            _context.next = 11;
            return _axeCore.default.run(element, options);

          case 11:
            result = _context.sent;

            // It's possible that we requested a new run on a different story.
            // Unfortunately, axe doesn't support a cancel method to abort current run.
            // We check if the story we run against is still the current one,
            // if not, trigger a new run using the current story
            if (activeStoryId === storyId) {
              channel.emit(_constants.EVENTS.RESULT, result);
            } else {
              active = false;
              run(activeStoryId);
            }

          case 13:
            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            channel.emit(_constants.EVENTS.ERROR, _context.t0);

          case 18:
            _context.prev = 18;
            active = false;
            return _context.finish(18);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15, 18, 21]]);
  }));

  return function run(_x) {
    return _ref.apply(this, arguments);
  };
}();
/** Returns story parameters or default ones. */


var getParams = function getParams(storyId) {
  var _ref2 = _global.window.__STORYBOOK_STORY_STORE__.fromId(storyId) || {},
      parameters = _ref2.parameters;

  return parameters.a11y || {
    config: {},
    options: {
      restoreScroll: true
    }
  };
};

channel.on(_constants.EVENTS.REQUEST, handleRequest);
channel.on(_constants.EVENTS.MANUAL, run);