import "core-js/modules/es.function.name";
import addons from '@storybook/addons';
import CoreEvents from '@storybook/core-events';
import { EVENTS } from './constants';
var prevEvents;
var currentEmit;

var onEmit = function onEmit(event) {
  currentEmit(event.name, event.payload);
};

var subscription = function subscription() {
  var channel = addons.getChannel();
  channel.on(EVENTS.EMIT, onEmit);
  return function () {
    prevEvents = null;
    addons.getChannel().emit(EVENTS.ADD, []);
    channel.removeListener(EVENTS.EMIT, onEmit);
  };
};

var addEvents = function addEvents(_ref) {
  var emit = _ref.emit,
      events = _ref.events;

  if (prevEvents !== events) {
    addons.getChannel().emit(EVENTS.ADD, events);
    prevEvents = events;
  }

  currentEmit = emit;
  addons.getChannel().emit(CoreEvents.REGISTER_SUBSCRIPTION, subscription);
};

export default (function (options) {
  return function (storyFn) {
    addEvents(options);
    return storyFn();
  };
});

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}