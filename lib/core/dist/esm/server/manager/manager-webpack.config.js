import "core-js/modules/es.promise";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import path from 'path';
import fse from 'fs-extra';
import { DefinePlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';
import VirtualModulePlugin from 'webpack-virtual-modules';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import themingPaths from '@storybook/theming/paths';
import uiPaths from '@storybook/ui/paths';
import readPackage from 'read-pkg-up';
import { getManagerHeadHtml } from '../utils/template';
import { loadEnv } from '../config/utils';
import { babelLoader } from './babel-loader-manager';
import { resolvePathInStorybookCache } from '../utils/resolve-path-in-sb-cache';
import { es6Transpiler } from '../common/es6Transpiler';
export default (async function ({
  configDir: configDir,
  configType: configType,
  docsMode: docsMode,
  entries: entries,
  refs: refs,
  outputDir: outputDir,
  cache: cache,
  previewUrl: previewUrl,
  versionCheck: versionCheck,
  releaseNotesData: releaseNotesData,
  presets: presets
}) {
  var _loadEnv = loadEnv(),
      raw = _loadEnv.raw,
      stringified = _loadEnv.stringified;

  var logLevel = await presets.apply('logLevel', undefined);
  var headHtmlSnippet = await presets.apply('managerHead', getManagerHeadHtml(configDir, process.env));
  var isProd = configType === 'PRODUCTION';
  var refsTemplate = fse.readFileSync(path.join(__dirname, 'virtualModuleRef.template.js'), {
    encoding: 'utf8'
  });

  var _await$readPackage = await readPackage({
    cwd: __dirname
  }),
      version = _await$readPackage.packageJson.version; // @ts-ignore
  // eslint-disable-next-line import/no-extraneous-dependencies


  var _await$import$catch = await import('webpack-bundle-analyzer').catch(function () {
    return {};
  }),
      BundleAnalyzerPlugin = _await$import$catch.BundleAnalyzerPlugin;

  return {
    name: 'manager',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    // FIXME: `none` is not a valid option for devtool
    // @ts-ignore
    devtool: 'none',
    entry: entries,
    output: {
      path: outputDir,
      filename: '[name].[chunkhash].bundle.js',
      publicPath: ''
    },
    cache: cache,
    plugins: [refs ? new VirtualModulePlugin({
      [path.resolve(path.join(configDir, `generated-refs.js`))]: refsTemplate.replace(`'{{refs}}'`, JSON.stringify(refs))
    }) : null, new HtmlWebpackPlugin({
      filename: `index.html`,
      // FIXME: `none` isn't a known option
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: function (compilation, files, options) {
        return {
          compilation: compilation,
          files: files,
          options: options,
          version: version,
          globals: {
            CONFIG_TYPE: configType,
            LOGLEVEL: logLevel,
            VERSIONCHECK: JSON.stringify(versionCheck),
            RELEASE_NOTES_DATA: JSON.stringify(releaseNotesData),
            DOCS_MODE: docsMode,
            // global docs mode
            PREVIEW_URL: previewUrl // global preview URL

          },
          headHtmlSnippet: headHtmlSnippet
        };
      },
      template: require.resolve(`../templates/index.ejs`)
    }), new CaseSensitivePathsPlugin(), new Dotenv({
      silent: true
    }), // graphql sources check process variable
    new DefinePlugin({
      'process.env': stringified,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }), isProd && BundleAnalyzerPlugin && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })].filter(Boolean),
    module: {
      rules: [babelLoader(), es6Transpiler(), {
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1
          }
        }]
      }, {
        test: /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json', '.cjs', '.ts', '.tsx'],
      modules: ['node_modules'].concat(raw.NODE_PATH || []),
      mainFields: isProd ? undefined : ['browser', 'main'],
      alias: _objectSpread(_objectSpread({}, themingPaths), uiPaths),
      plugins: [// Transparently resolve packages via PnP when needed; noop otherwise
      PnpWebpackPlugin]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    recordsPath: resolvePathInStorybookCache('public/records.json'),
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
      sideEffects: true,
      usedExports: true,
      concatenateModules: true,
      minimizer: isProd ? [new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: false,
          keep_fnames: true
        } // FIXME: `cache` isn't a known attribute

      })] : []
    }
  };
});