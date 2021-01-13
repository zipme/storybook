import "core-js/modules/es.promise";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import chalk from 'chalk';
import cpy from 'cpy';
import fs from 'fs-extra';
import path from 'path';
import webpack from 'webpack';
import { logger } from '@storybook/node-logger';
import { getProdCli } from './cli';
import loadConfig from './config';
import loadManagerConfig from './manager/manager-config';
import { logConfig } from './logConfig';
import { getPrebuiltDir } from './utils/prebuilt-manager';
import { parseStaticDir } from './utils/static-files';

async function compileManager(managerConfig, managerStartTime) {
  logger.info('=> Compiling manager..');
  return new Promise(function (resolve, reject) {
    webpack(managerConfig).run(function (error, stats) {
      if (error || !stats || stats.hasErrors()) {
        logger.error('=> Failed to build the manager');

        if (error) {
          logger.error(error.message);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          var _stats$toJson = stats.toJson(managerConfig.stats),
              warnings = _stats$toJson.warnings,
              errors = _stats$toJson.errors;

          errors.forEach(function (e) {
            return logger.error(e);
          });
          warnings.forEach(function (e) {
            return logger.error(e);
          });
        }

        process.exitCode = 1;
        reject(error || stats);
        return;
      }

      logger.trace({
        message: '=> Manager built',
        time: process.hrtime(managerStartTime)
      });
      stats.toJson(managerConfig.stats).warnings.forEach(function (e) {
        return logger.warn(e);
      });
      resolve(stats);
    });
  });
}

async function watchPreview(previewConfig) {
  logger.info('=> Compiling preview in watch mode..');
  return new Promise(function () {
    webpack(previewConfig).watch({
      aggregateTimeout: 1
    }, function (error, stats) {
      if (!error) {
        var statsConfig = previewConfig.stats ? previewConfig.stats : {
          colors: true
        }; // eslint-disable-next-line no-console

        console.log(stats.toString(statsConfig));
      } else {
        logger.error(error.message);
      }
    });
  });
}

async function compilePreview(previewConfig, previewStartTime) {
  logger.info('=> Compiling preview..');
  return new Promise(function (resolve, reject) {
    webpack(previewConfig).run(function (error, stats) {
      if (error || !stats || stats.hasErrors()) {
        logger.error('=> Failed to build the preview');
        process.exitCode = 1;

        if (error) {
          logger.error(error.message);
          return reject(error);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          var _stats$toJson2 = stats.toJson(previewConfig.stats),
              warnings = _stats$toJson2.warnings,
              errors = _stats$toJson2.errors;

          errors.forEach(function (e) {
            return logger.error(e);
          });
          warnings.forEach(function (e) {
            return logger.error(e);
          });
          return reject(stats);
        }
      }

      logger.trace({
        message: '=> Preview built',
        time: process.hrtime(previewStartTime)
      });

      if (stats) {
        stats.toJson(previewConfig.stats).warnings.forEach(function (e) {
          return logger.warn(e);
        });
      }

      return resolve(stats);
    });
  });
}

async function copyAllStaticFiles(staticDirs, outputDir) {
  if (staticDirs && staticDirs.length > 0) {
    await Promise.all(staticDirs.map(async function (dir) {
      try {
        var _await$parseStaticDir = await parseStaticDir(dir),
            staticDir = _await$parseStaticDir.staticDir,
            staticPath = _await$parseStaticDir.staticPath,
            targetDir = _await$parseStaticDir.targetDir;

        var targetPath = path.join(outputDir, targetDir);
        logger.info(chalk`=> Copying static files: {cyan ${staticDir}} => {cyan ${targetDir}}`); // Storybook's own files should not be overwritten, so we skip such files if we find them

        var skipPaths = ['index.html', 'iframe.html'].map(function (f) {
          return path.join(targetPath, f);
        });
        await fs.copy(staticPath, targetPath, {
          filter: function (_, dest) {
            return !skipPaths.includes(dest);
          }
        });
      } catch (e) {
        logger.error(e.message);
        process.exit(-1);
      }
    }));
  }
}

async function buildManager(configType, outputDir, configDir, options) {
  logger.info('=> Building manager..');
  var managerStartTime = process.hrtime();
  logger.info('=> Loading manager config..');
  var managerConfig = await loadManagerConfig(_objectSpread(_objectSpread({}, options), {}, {
    configType: configType,
    outputDir: outputDir,
    configDir: configDir,
    corePresets: [require.resolve('./manager/manager-preset.js')]
  }));

  if (options.debugWebpack) {
    logConfig('Manager webpack config', managerConfig);
  }

  return compileManager(managerConfig, managerStartTime);
}

async function buildPreview(configType, outputDir, packageJson, options) {
  var watch = options.watch,
      debugWebpack = options.debugWebpack;
  logger.info('=> Building preview..');
  var previewStartTime = process.hrtime();
  logger.info('=> Loading preview config..');
  var previewConfig = await loadConfig(_objectSpread(_objectSpread({}, options), {}, {
    configType: configType,
    outputDir: outputDir,
    packageJson: packageJson,
    corePresets: [require.resolve('./preview/preview-preset.js')],
    overridePresets: [require.resolve('./preview/custom-webpack-preset.js')]
  }));

  if (debugWebpack) {
    logConfig('Preview webpack config', previewConfig);
  }

  if (watch) {
    return watchPreview(previewConfig);
  }

  return compilePreview(previewConfig, previewStartTime);
}

export async function buildStaticStandalone(options) {
  var staticDir = options.staticDir,
      configDir = options.configDir,
      packageJson = options.packageJson;
  var configType = 'PRODUCTION';
  var outputDir = path.isAbsolute(options.outputDir) ? options.outputDir : path.join(process.cwd(), options.outputDir);

  var defaultFavIcon = require.resolve('./public/favicon.ico');

  logger.info(chalk`=> Cleaning outputDir: {cyan ${outputDir}}`);
  if (outputDir === '/') throw new Error("Won't remove directory '/'. Check your outputDir!");
  await fs.remove(outputDir);
  await cpy(defaultFavIcon, outputDir);
  await copyAllStaticFiles(staticDir, outputDir);
  var prebuiltDir = await getPrebuiltDir({
    configDir: configDir,
    options: options
  });

  if (prebuiltDir) {
    await cpy('**', outputDir, {
      cwd: prebuiltDir,
      parents: true
    });
  } else {
    await buildManager(configType, outputDir, configDir, options);
  }

  if (options.managerOnly) {
    logger.info(`=> Not building preview`);
  } else {
    await buildPreview(configType, outputDir, packageJson, options);
  }

  logger.info(`=> Output directory: ${outputDir}`);
}
export function buildStatic(_ref) {
  var packageJson = _ref.packageJson,
      loadOptions = _objectWithoutProperties(_ref, ["packageJson"]);

  var cliOptions = getProdCli(packageJson);
  return buildStaticStandalone(_objectSpread(_objectSpread(_objectSpread({}, cliOptions), loadOptions), {}, {
    packageJson: packageJson,
    configDir: loadOptions.configDir || cliOptions.configDir || './.storybook',
    outputDir: loadOptions.outputDir || cliOptions.outputDir || './storybook-static',
    ignorePreview: !!cliOptions.previewUrl,
    docsMode: !!cliOptions.docs
  })).catch(function (e) {
    logger.error(e);
    process.exit(1);
  });
}