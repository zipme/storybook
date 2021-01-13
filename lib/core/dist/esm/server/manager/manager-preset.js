import "core-js/modules/es.promise";
import { loadManagerOrAddonsFile } from '../utils/load-manager-or-addons-file';
import createDevConfig from './manager-webpack.config';
export async function managerWebpack(_, options) {
  return createDevConfig(options);
}
export async function managerEntries(installedAddons, options) {
  var _options$managerEntry = options.managerEntry,
      managerEntry = _options$managerEntry === void 0 ? '../../client/manager' : _options$managerEntry;
  var entries = [require.resolve('../common/polyfills')];

  if (installedAddons && installedAddons.length) {
    entries.push(...installedAddons);
  }

  var managerConfig = loadManagerOrAddonsFile(options);

  if (managerConfig) {
    entries.push(managerConfig);
  }

  entries.push(require.resolve(managerEntry));
  return entries;
}
export * from '../common/common-preset';