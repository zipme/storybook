"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  managerWebpack: true,
  managerEntries: true
};
exports.managerWebpack = managerWebpack;
exports.managerEntries = managerEntries;

var _loadManagerOrAddonsFile = require("../utils/load-manager-or-addons-file");

var _managerWebpack = _interopRequireDefault(require("./manager-webpack.config"));

var _commonPreset = require("../common/common-preset");

Object.keys(_commonPreset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _commonPreset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commonPreset[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function managerWebpack(_, options) {
  return (0, _managerWebpack.default)(options);
}

async function managerEntries(installedAddons, options) {
  var _options$managerEntry = options.managerEntry,
      managerEntry = _options$managerEntry === void 0 ? '../../client/manager' : _options$managerEntry;
  var entries = [require.resolve('../common/polyfills')];

  if (installedAddons && installedAddons.length) {
    entries.push(...installedAddons);
  }

  var managerConfig = (0, _loadManagerOrAddonsFile.loadManagerOrAddonsFile)(options);

  if (managerConfig) {
    entries.push(managerConfig);
  }

  entries.push(require.resolve(managerEntry));
  return entries;
}