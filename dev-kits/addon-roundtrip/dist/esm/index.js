function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useChannel } from '@storybook/client-api';
import { EVENTS } from './constants';
export var withRoundtrip = function withRoundtrip(storyFn) {
  var emit = useChannel(_defineProperty({}, EVENTS.REQUEST, function () {
    emit(EVENTS.RESULT, ['from the preview']);
  }));
  return storyFn();
};