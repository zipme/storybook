"use strict";

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDocsBeforeControls = exports.verifyDocsBeforeControls = void 0;

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Expected '@storybook/addon-docs' to be listed before '@storybook/addon-controls' (or '@storybook/addon-essentials'). Check your main.js?\n        \n        https://github.com/storybookjs/storybook/issues/11442\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var findIndex = function findIndex(addon, addons) {
  return addons.findIndex(function (entry) {
    var name = entry.name || entry;
    return name && name.includes(addon);
  });
};

var indexOfAddonOrEssentials = function indexOfAddonOrEssentials(addon, addons) {
  var index = findIndex(addon, addons);
  return index >= 0 ? index : findIndex('@storybook/addon-essentials', addons);
};

var verifyDocsBeforeControls = function verifyDocsBeforeControls(addons) {
  var docsIndex = indexOfAddonOrEssentials('@storybook/addon-docs', addons);
  var controlsIndex = indexOfAddonOrEssentials('@storybook/addon-controls', addons);
  return controlsIndex >= 0 && docsIndex >= 0 && docsIndex <= controlsIndex;
};

exports.verifyDocsBeforeControls = verifyDocsBeforeControls;

var ensureDocsBeforeControls = function ensureDocsBeforeControls(configDir) {
  var mainFile = _path.default.isAbsolute(configDir) ? _path.default.join(configDir, 'main') : _path.default.join(process.cwd(), configDir, 'main');

  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    var main = require(mainFile);

    if (!(main !== null && main !== void 0 && main.addons)) {
      _nodeLogger.logger.warn("Unable to find main.js addons: ".concat(mainFile));

      return;
    }

    if (!verifyDocsBeforeControls(main.addons)) {
      _nodeLogger.logger.warn((0, _tsDedent.default)(_templateObject()));
    }
  } catch (err) {
    _nodeLogger.logger.warn("Unable to find main.js: ".concat(mainFile));
  }
};

exports.ensureDocsBeforeControls = ensureDocsBeforeControls;