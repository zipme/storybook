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

var _WatchMissingNodeModulesPlugin = _interopRequireDefault(require("react-dev-utils/WatchMissingNodeModulesPlugin"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _webpackVirtualModules = _interopRequireDefault(require("webpack-virtual-modules"));

var _pnpWebpackPlugin = _interopRequireDefault(require("pnp-webpack-plugin"));

var _forkTsCheckerWebpackPlugin = _interopRequireDefault(require("fork-ts-checker-webpack-plugin"));

var _webpackFilterWarningsPlugin = _interopRequireDefault(require("webpack-filter-warnings-plugin"));

var _paths = _interopRequireDefault(require("@storybook/theming/paths"));

var _babelLoaderPreview = require("./babel-loader-preview");

var _es6Transpiler = require("../common/es6Transpiler");

var _utils = require("../config/utils");

var _template = require("../utils/template");

var _toRequireContext = require("./to-require-context");

var _useBaseTsSupport = require("../config/useBaseTsSupport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var storybookPaths = ['addons', 'api', 'channels', 'channel-postmessage', 'components', 'core-events', 'router', 'theming', 'semver', 'client-api', 'client-logger'].reduce(function (acc, sbPackage) {
  return _objectSpread(_objectSpread({}, acc), {}, {
    [`@storybook/${sbPackage}`]: _path.default.dirname(require.resolve(`@storybook/${sbPackage}/package.json`))
  });
}, {});

var _default = async function _default({
  configDir: configDir,
  babelOptions: babelOptions,
  entries: entries,
  stories: stories,
  outputDir = _path.default.join('.', 'public'),
  quiet: quiet,
  packageJson: packageJson,
  configType: configType,
  framework: framework,
  frameworkPath: frameworkPath,
  presets: presets,
  typescriptOptions: typescriptOptions
}) {
  var logLevel = await presets.apply('logLevel', undefined);
  var frameworkOptions = await presets.apply(`${framework}Options`, {});
  var headHtmlSnippet = await presets.apply('previewHead', (0, _template.getPreviewHeadHtml)(configDir, process.env));
  var bodyHtmlSnippet = await presets.apply('previewBody', (0, _template.getPreviewBodyHtml)(configDir, process.env));

  var _loadEnv = (0, _utils.loadEnv)({
    production: true
  }),
      raw = _loadEnv.raw,
      stringified = _loadEnv.stringified;

  var babelLoader = (0, _babelLoaderPreview.createBabelLoader)(babelOptions, framework);
  var isProd = configType === 'PRODUCTION';
  var entryTemplate = await _fsExtra.default.readFile( // TODO ANDREW maybe something simpler
  _path.default.join(__dirname, '../../../esm/server/preview', 'virtualModuleEntry.template.js'), {
    encoding: 'utf8'
  });
  var storyTemplate = await _fsExtra.default.readFile(_path.default.join(__dirname, 'virtualModuleStory.template.js'), {
    encoding: 'utf8'
  });

  var frameworkInitEntry = _path.default.resolve(_path.default.join(configDir, 'storybook-init-framework-entry.js')); // Allows for custom frameworks that are not published under the @storybook namespace


  var frameworkImportPath = frameworkPath || `@storybook/${framework}`;
  var virtualModuleMapping = {
    // Ensure that the client API is initialized by the framework before any other iframe code
    // is loaded. That way our client-apis can assume the existence of the API+store
    [frameworkInitEntry]: `import '${frameworkImportPath}';`
  };
  entries.forEach(function (entryFilename) {
    var match = entryFilename.match(/(.*)-generated-(config|other)-entry.js$/);

    if (match) {
      var configFilename = match[1];
      var clientApi = storybookPaths['@storybook/client-api'];
      var clientLogger = storybookPaths['@storybook/client-logger'];
      virtualModuleMapping[entryFilename] = interpolate(entryTemplate, {
        configFilename: configFilename,
        clientApi: clientApi,
        clientLogger: clientLogger
      });
    }
  });

  if (stories) {
    var storiesFilename = _path.default.resolve(_path.default.join(configDir, `generated-stories-entry.js`));

    virtualModuleMapping[storiesFilename] = interpolate(storyTemplate, {
      frameworkImportPath: frameworkImportPath
    }) // Make sure we also replace quotes for this one
    .replace("'{{stories}}'", stories.map(_toRequireContext.toRequireContextString).join(','));
  }

  var shouldCheckTs = (0, _useBaseTsSupport.useBaseTsSupport)(framework) && typescriptOptions.check;
  var tsCheckOptions = typescriptOptions.checkOptions || {};
  return {
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: '#cheap-module-source-map',
    entry: entries,
    output: {
      path: _path.default.resolve(process.cwd(), outputDir),
      filename: '[name].[hash].bundle.js',
      publicPath: ''
    },
    plugins: [new _webpackFilterWarningsPlugin.default({
      exclude: /export '\S+' was not found in 'global'/
    }), Object.keys(virtualModuleMapping).length > 0 ? new _webpackVirtualModules.default(virtualModuleMapping) : null, new _htmlWebpackPlugin.default({
      filename: `iframe.html`,
      // FIXME: `none` isn't a known option
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: function (compilation, files, options) {
        return {
          compilation: compilation,
          files: files,
          options: options,
          version: packageJson.version,
          globals: {
            LOGLEVEL: logLevel,
            FRAMEWORK_OPTIONS: frameworkOptions
          },
          headHtmlSnippet: headHtmlSnippet,
          bodyHtmlSnippet: bodyHtmlSnippet
        };
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: false,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: require.resolve(`../templates/index.ejs`)
    }), new _webpack.DefinePlugin({
      'process.env': stringified,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }), isProd ? null : new _WatchMissingNodeModulesPlugin.default(_utils.nodeModulesPaths), isProd ? null : new _webpack.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin.default(), quiet ? null : new _webpack.ProgressPlugin(), new _dotenvWebpack.default({
      silent: true
    }), shouldCheckTs ? new _forkTsCheckerWebpackPlugin.default(tsCheckOptions) : null].filter(Boolean),
    module: {
      rules: [babelLoader, (0, _es6Transpiler.es6Transpiler)(), {
        test: /\.md$/,
        use: [{
          loader: require.resolve('raw-loader')
        }]
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.cjs'],
      modules: ['node_modules'].concat(raw.NODE_PATH || []),
      mainFields: isProd ? undefined : ['browser', 'main'],
      alias: _objectSpread(_objectSpread(_objectSpread({}, _paths.default), storybookPaths), {}, {
        react: _path.default.dirname(require.resolve('react/package.json')),
        'react-dom': _path.default.dirname(require.resolve('react-dom/package.json'))
      }),
      plugins: [// Transparently resolve packages via PnP when needed; noop otherwise
      _pnpWebpackPlugin.default]
    },
    resolveLoader: {
      plugins: [_pnpWebpackPlugin.default.moduleLoader(module)]
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
    },
    performance: {
      hints: isProd ? 'warning' : false
    }
  };
};
/**
 * Return a string corresponding to template filled with bindings using following pattern:
 * For each (key, value) of `bindings` replace, in template, `{{key}}` by escaped version of `value`
 *
 * @param template {String} Template with `{{binding}}`
 * @param bindings {Object} key-value object use to fill the template, `{{key}}` will be replaced by `escaped(value)`
 * @returns {String} Filled template
 */


exports.default = _default;

var interpolate = function (template, bindings) {
  return Object.entries(bindings).reduce(function (acc, [k, v]) {
    var escapedString = v.replace(/\\/g, '/').replace(/\$/g, '$$$');
    return acc.replace(new RegExp(`{{${k}}}`, 'g'), escapedString);
  }, template);
};