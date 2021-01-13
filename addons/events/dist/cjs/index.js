"use strict";

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prevEvents;
var currentEmit;

var onEmit = function onEmit(event) {
  currentEmit(event.name, event.payload);
};

var subscription = function subscription() {
  var channel = _addons.default.getChannel();

  channel.on(_constants.EVENTS.EMIT, onEmit);
  return function () {
    prevEvents = null;

    _addons.default.getChannel().emit(_constants.EVENTS.ADD, []);

    channel.removeListener(_constants.EVENTS.EMIT, onEmit);
  };
};

var addEvents = function addEvents(_ref) {
  var emit = _ref.emit,
      events = _ref.events;

  if (prevEvents !== events) {
    _addons.default.getChannel().emit(_constants.EVENTS.ADD, events);

    prevEvents = events;
  }

  currentEmit = emit;

  _addons.default.getChannel().emit(_coreEvents.default.REGISTER_SUBSCRIPTION, subscription);
};

var _default = function _default(options) {
  return function (storyFn) {
    addEvents(options);
    return storyFn();
  };
};

exports.default = _default;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}