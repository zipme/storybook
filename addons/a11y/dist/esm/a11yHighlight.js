import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import { document } from 'global';
import addons from '@storybook/addons';
import { STORY_CHANGED } from '@storybook/core-events';
import { EVENTS, HIGHLIGHT_STYLE_ID } from './constants';
import { highlightStyle } from './highlight';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

var channel = addons.getChannel();

var highlight = function highlight(infos) {
  var id = HIGHLIGHT_STYLE_ID;
  resetHighlight();
  var sheet = document.createElement('style');
  sheet.setAttribute('id', id);
  sheet.innerHTML = infos.elements.map(function (target) {
    return "".concat(target, "{ \n          ").concat(highlightStyle(infos.color), "\n         }");
  }).join(' ');
  document.head.appendChild(sheet);
};

var resetHighlight = function resetHighlight() {
  var id = HIGHLIGHT_STYLE_ID;
  var sheetToBeRemoved = document.getElementById(id);

  if (sheetToBeRemoved) {
    sheetToBeRemoved.parentNode.removeChild(sheetToBeRemoved);
  }
};

channel.on(STORY_CHANGED, resetHighlight);
channel.on(EVENTS.HIGHLIGHT, highlight);