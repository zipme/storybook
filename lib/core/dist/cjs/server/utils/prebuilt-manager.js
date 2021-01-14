"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrebuiltDir = exports.IGNORED_ADDONS = exports.DEFAULT_ADDONS = void 0;

var _nodeLogger = require("@storybook/node-logger");

var _fsExtra = require("fs-extra");

var _path = _interopRequireDefault(require("path"));

var _managerConfig = require("../manager/manager-config");

var _interpretFiles = require("./interpret-files");

var _loadManagerOrAddonsFile = require("./load-manager-or-addons-file");

var _serverRequire2 = require("./server-require");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Addons automatically installed when running `sb init` (see baseGenerator.ts)
var DEFAULT_ADDONS = ['@storybook/addon-links', '@storybook/addon-essentials']; // Addons we can safely ignore because they don't affect the manager

exports.DEFAULT_ADDONS = DEFAULT_ADDONS;
var IGNORED_ADDONS = ['@storybook/preset-create-react-app', '@storybook/preset-scss', '@storybook/preset-typescript', ...DEFAULT_ADDONS];
exports.IGNORED_ADDONS = IGNORED_ADDONS;

var getPrebuiltDir = async function ({
  configDir: configDir,
  options: options
}) {
  if (options.managerCache === false || options.smokeTest) return false;

  var prebuiltDir = _path.default.join(__dirname, '../../../prebuilt');

  var hasPrebuiltManager = await (0, _fsExtra.pathExists)(_path.default.join(prebuiltDir, 'index.html'));
  if (!hasPrebuiltManager) return false;
  var hasManagerConfig = !!(0, _loadManagerOrAddonsFile.loadManagerOrAddonsFile)({
    configDir: configDir
  });
  if (hasManagerConfig) return false;
  var mainConfigFile = (0, _interpretFiles.getInterpretedFile)(_path.default.resolve(configDir, 'main'));
  if (!mainConfigFile) return false;

  var _serverRequire = (0, _serverRequire2.serverRequire)(mainConfigFile),
      addons = _serverRequire.addons,
      refs = _serverRequire.refs,
      managerBabel = _serverRequire.managerBabel,
      managerWebpack = _serverRequire.managerWebpack;

  if (!addons || refs || managerBabel || managerWebpack) return false;
  if (DEFAULT_ADDONS.some(function (addon) {
    return !addons.includes(addon);
  })) return false;
  if (addons.some(function (addon) {
    return !IGNORED_ADDONS.includes(addon);
  })) return false; // Auto refs will not be listed in the config, so we have to verify there aren't any

  var autoRefs = await (0, _managerConfig.getAutoRefs)({
    configDir: configDir
  });
  if (autoRefs.length > 0) return false;

  _nodeLogger.logger.info('=> Using prebuilt manager');

  return prebuiltDir;
};

exports.getPrebuiltDir = getPrebuiltDir;