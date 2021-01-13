import "core-js/modules/es.promise";
import { logger } from '@storybook/node-logger';
import loadCustomWebpackConfig from '../utils/load-custom-webpack-config';
import { createDefaultWebpackConfig } from './base-webpack.config';

async function createFinalDefaultConfig(presets, config, options) {
  var defaultConfig = await createDefaultWebpackConfig(config, options);
  return presets.apply('webpackFinal', defaultConfig, options);
}

export async function webpack(config, options) {
  var configDir = options.configDir,
      configType = options.configType,
      presets = options.presets,
      webpackConfig = options.webpackConfig;
  var finalDefaultConfig = await createFinalDefaultConfig(presets, config, options); // through standalone webpackConfig option

  if (webpackConfig) {
    return webpackConfig(finalDefaultConfig);
  } // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.


  var customConfig = loadCustomWebpackConfig(configDir);

  if (typeof customConfig === 'function') {
    logger.info('=> Loading custom Webpack config (full-control mode).');
    return customConfig({
      config: finalDefaultConfig,
      mode: configType
    });
  }

  logger.info('=> Using default Webpack setup');
  return finalDefaultConfig;
}