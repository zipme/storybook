import "core-js/modules/es.array.find";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.freeze";
import "core-js/modules/web.dom-collections.for-each";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Backgrounds Addon: could not find the default color \"", "\".\n        These are the available colors for your story based on your configuration:\n        ", ".\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { document } from 'global';
import dedent from 'ts-dedent';
import { logger } from '@storybook/client-logger';
export var getBackgroundColorByName = function getBackgroundColorByName(currentSelectedValue) {
  var backgrounds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultName = arguments.length > 2 ? arguments[2] : undefined;

  if (currentSelectedValue === 'transparent') {
    return 'transparent';
  }

  if (backgrounds.find(function (background) {
    return background.value === currentSelectedValue;
  })) {
    return currentSelectedValue;
  }

  var defaultBackground = backgrounds.find(function (background) {
    return background.name === defaultName;
  });

  if (defaultBackground) {
    return defaultBackground.value;
  }

  if (defaultName) {
    var availableColors = backgrounds.map(function (background) {
      return background.name;
    }).join(', ');
    logger.warn(dedent(_templateObject(), defaultName, availableColors));
  }

  return 'transparent';
};
export var clearStyles = function clearStyles(selector) {
  var selectors = Array.isArray(selector) ? selector : [selector];
  selectors.forEach(clearStyle);
};

var clearStyle = function clearStyle(selector) {
  var element = document.getElementById(selector);

  if (element) {
    element.parentElement.removeChild(element);
  }
};

export var addGridStyle = function addGridStyle(selector, css) {
  var existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    var style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};
export var addBackgroundStyle = function addBackgroundStyle(selector, css, storyId) {
  var existingStyle = document.getElementById(selector);

  if (existingStyle) {
    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }
  } else {
    var style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = css;
    var gridStyleSelector = "addon-backgrounds-grid".concat(storyId ? "-docs-".concat(storyId) : ''); // If grids already exist, we want to add the style tag BEFORE it so the background doesn't override grid

    var existingGridStyle = document.getElementById(gridStyleSelector);

    if (existingGridStyle) {
      existingGridStyle.parentElement.insertBefore(style, existingGridStyle);
    } else {
      document.head.appendChild(style);
    }
  }
};