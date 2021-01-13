"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _webpack = require("webpack");

var _dotenvWebpack = _interopRequireDefault(require("dotenv-webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _pnpWebpackPlugin = _interopRequireDefault(require("pnp-webpack-plugin"));

var _webpackVirtualModules = _interopRequireDefault(require("webpack-virtual-modules"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _paths = _interopRequireDefault(require("@storybook/theming/paths"));

var _paths2 = _interopRequireDefault(require("@storybook/ui/paths"));

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

var _template = require("../utils/template");

var _utils = require("../config/utils");

var _babelLoaderManager = require("./babel-loader-manager");

var _resolvePathInSbCache = require("../utils/resolve-path-in-sb-cache");

var _es6Transpiler = require("../common/es6Transpiler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = async function _default({
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
  var _loadEnv = (0, _utils.loadEnv)(),
      raw = _loadEnv.raw,
      stringified = _loadEnv.stringified;

  var logLevel = await presets.apply('logLevel', undefined);
  var headHtmlSnippet = await presets.apply('managerHead', (0, _template.getManagerHeadHtml)(configDir, process.env));
  var isProd = configType === 'PRODUCTION';

  var refsTemplate = _fsExtra.default.readFileSync(_path.default.join(__dirname, 'virtualModuleRef.template.js'), {
    encoding: 'utf8'
  });

  var _await$readPackage = await (0, _readPkgUp.default)({
    cwd: __dirname
  }),
      version = _await$readPackage.packageJson.version; // @ts-ignore
  // eslint-disable-next-line import/no-extraneous-dependencies


  var _await$import$catch = await Promise.resolve().then(function () {
    return _interopRequireWildcard(require('webpack-bundle-analyzer'));
  }).catch(function () {
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
    plugins: [refs ? new _webpackVirtualModules.default({
      [_path.default.resolve(_path.default.join(configDir, `generated-refs.js`))]: refsTemplate.replace(`'{{refs}}'`, JSON.stringify(refs))
    }) : null, new _htmlWebpackPlugin.default({
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
    }), new _caseSensitivePathsWebpackPlugin.default(), new _dotenvWebpack.default({
      silent: true
    }), // graphql sources check process variable
    new _webpack.DefinePlugin({
      'process.env': stringified,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }), isProd && BundleAnalyzerPlugin && new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })].filter(Boolean),
    module: {
      rules: [(0, _babelLoaderManager.babelLoader)(), (0, _es6Transpiler.es6Transpiler)(), {
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
      alias: _objectSpread(_objectSpread({}, _paths.default), _paths2.default),
      plugins: [// Transparently resolve packages via PnP when needed; noop otherwise
      _pnpWebpackPlugin.default]
    },
    resolveLoader: {
      plugins: [_pnpWebpackPlugin.default.moduleLoader(module)]
    },
    recordsPath: (0, _resolvePathInSbCache.resolvePathInStorybookCache)('public/records.json'),
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
      minimizer: isProd ? [new _terserWebpackPlugin.default({
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
};

exports.default = _default;