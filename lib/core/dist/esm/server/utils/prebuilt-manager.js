import "core-js/modules/es.promise";
import { logger } from '@storybook/node-logger';
import { pathExists } from 'fs-extra';
import path from 'path';
import { getAutoRefs } from '../manager/manager-config';
import { getInterpretedFile } from './interpret-files';
import { loadManagerOrAddonsFile } from './load-manager-or-addons-file';
import { serverRequire } from './server-require'; // Addons automatically installed when running `sb init` (see baseGenerator.ts)

export var DEFAULT_ADDONS = ['@storybook/addon-links', '@storybook/addon-essentials']; // Addons we can safely ignore because they don't affect the manager

export var IGNORED_ADDONS = ['@storybook/preset-create-react-app', '@storybook/preset-scss', '@storybook/preset-typescript', ...DEFAULT_ADDONS];
export var getPrebuiltDir = async function ({
  configDir: configDir,
  options: options
}) {
  if (options.managerCache === false || options.smokeTest) return false;
  var prebuiltDir = path.join(__dirname, '../../../prebuilt');
  var hasPrebuiltManager = await pathExists(path.join(prebuiltDir, 'index.html'));
  if (!hasPrebuiltManager) return false;
  var hasManagerConfig = !!loadManagerOrAddonsFile({
    configDir: configDir
  });
  if (hasManagerConfig) return false;
  var mainConfigFile = getInterpretedFile(path.resolve(configDir, 'main'));
  if (!mainConfigFile) return false;

  var _serverRequire = serverRequire(mainConfigFile),
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

  var autoRefs = await getAutoRefs({
    configDir: configDir
  });
  if (autoRefs.length > 0) return false;
  logger.info('=> Using prebuilt manager');
  return prebuiltDir;
};