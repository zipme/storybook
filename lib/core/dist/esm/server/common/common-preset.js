import "core-js/modules/es.promise";
import loadCustomBabelConfig from '../utils/load-custom-babel-config';
import { babelConfig } from './babel';
export var babel = async function (_, options) {
  var configDir = options.configDir,
      presets = options.presets;
  return loadCustomBabelConfig(configDir, function () {
    return presets.apply('babelDefault', babelConfig(), options);
  });
};
export var logLevel = function (previous, options) {
  return previous || options.loglevel || 'info';
};