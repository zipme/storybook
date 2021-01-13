import path from 'path';
import { serverRequire, serverResolve } from '../utils/server-require';
import validateConfigurationFiles from '../utils/validate-configuration-files';
export default function loadCustomPresets({
  configDir: configDir
}) {
  validateConfigurationFiles(configDir);
  var presets = serverRequire(path.resolve(configDir, 'presets'));
  var main = serverRequire(path.resolve(configDir, 'main'));

  if (main) {
    return [serverResolve(path.resolve(configDir, 'main'))];
  }

  return presets || [];
}