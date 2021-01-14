"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storybookDevServer = storybookDevServer;

var _nodeLogger = require("@storybook/node-logger");

var _betterOpn = _interopRequireDefault(require("better-opn"));

var _chalk = _interopRequireDefault(require("chalk"));

var _express = _interopRequireWildcard(require("express"));

var _fsExtra = require("fs-extra");

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _ip = _interopRequireDefault(require("ip"));

var _path = _interopRequireDefault(require("path"));

var _prettyHrtime = _interopRequireDefault(require("pretty-hrtime"));

var _telejson = require("telejson");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

var _webpack = _interopRequireWildcard(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _middleware = require("./utils/middleware");

var _logConfig = require("./logConfig");

var _config = _interopRequireDefault(require("./config"));

var _managerConfig = _interopRequireDefault(require("./manager/manager-config"));

var _resolvePathInSbCache = require("./utils/resolve-path-in-sb-cache");

var _prebuiltManager = require("./utils/prebuilt-manager");

var _staticFiles = require("./utils/static-files");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultFavIcon = require.resolve('./public/favicon.ico');

var cache = {};
var previewProcess;
var previewReject;

var bailPreview = function (e) {
  if (previewReject) previewReject();

  if (previewProcess) {
    try {
      previewProcess.close();

      _nodeLogger.logger.warn('Force closed preview build');
    } catch (err) {
      _nodeLogger.logger.warn('Unable to close preview build!');
    }
  }

  throw e;
};

async function getServer(app, options) {
  if (!options.https) {
    return _http.default.createServer(app);
  }

  if (!options.sslCert) {
    _nodeLogger.logger.error('Error: --ssl-cert is required with --https');

    process.exit(-1);
  }

  if (!options.sslKey) {
    _nodeLogger.logger.error('Error: --ssl-key is required with --https');

    process.exit(-1);
  }

  var sslOptions = {
    ca: await Promise.all((options.sslCa || []).map(function (ca) {
      return (0, _fsExtra.readFile)(ca, 'utf-8');
    })),
    cert: await (0, _fsExtra.readFile)(options.sslCert, 'utf-8'),
    key: await (0, _fsExtra.readFile)(options.sslKey, 'utf-8')
  };
  return _https.default.createServer(sslOptions, app);
}

async function useStatics(router, options) {
  var hasCustomFavicon = false;

  if (options.staticDir && options.staticDir.length > 0) {
    await Promise.all(options.staticDir.map(async function (dir) {
      try {
        var _await$parseStaticDir = await (0, _staticFiles.parseStaticDir)(dir),
            staticDir = _await$parseStaticDir.staticDir,
            staticPath = _await$parseStaticDir.staticPath,
            targetEndpoint = _await$parseStaticDir.targetEndpoint;

        _nodeLogger.logger.info((0, _chalk.default)`=> Serving static files from {cyan ${staticDir}} at {cyan ${targetEndpoint}}`);

        router.use(targetEndpoint, _express.default.static(staticPath, {
          index: false
        }));

        if (!hasCustomFavicon && targetEndpoint === '/') {
          var faviconPath = _path.default.join(staticPath, 'favicon.ico');

          if (await (0, _fsExtra.pathExists)(faviconPath)) {
            hasCustomFavicon = true;
            router.use((0, _serveFavicon.default)(faviconPath));
          }
        }
      } catch (e) {
        _nodeLogger.logger.warn(e.message);
      }
    }));
  }

  if (!hasCustomFavicon) {
    router.use((0, _serveFavicon.default)(defaultFavIcon));
  }
}

function openInBrowser(address) {
  try {
    (0, _betterOpn.default)(address);
  } catch (error) {
    _nodeLogger.logger.error((0, _tsDedent.default)`
      Could not open ${address} inside a browser. If you're running this command inside a
      docker container or on a CI, you need to pass the '--ci' flag to prevent opening a
      browser by default.
    `);
  }
} // @ts-ignore


var router = new _express.Router();

var printDuration = function (startTime) {
  return (0, _prettyHrtime.default)(process.hrtime(startTime)).replace(' ms', ' milliseconds').replace(' s', ' seconds').replace(' m', ' minutes');
};

var useProgressReporting = async function (compiler, options, startTime) {
  var _options$cache;

  var value = 0;
  var totalModules;

  var reportProgress = function () {};

  router.get('/progress', function (request, response) {
    var closed = false;

    var close = function () {
      closed = true;
      response.end();
    };

    response.on('close', close);
    if (closed || response.writableEnded) return;
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders();

    reportProgress = function (progress) {
      if (closed || response.writableEnded) return;
      response.write(`data: ${JSON.stringify(progress)}\n\n`);
      if (progress.value === 1) close();
    };
  });

  var handler = function (newValue, message, arg3) {
    value = Math.max(newValue, value); // never go backwards

    var progress = {
      value: value,
      message: message.charAt(0).toUpperCase() + message.slice(1)
    };

    if (message === 'building') {
      // arg3 undefined in webpack5
      var counts = arg3 && arg3.match(/(\d+)\/(\d+)/) || [];
      var complete = parseInt(counts[1], 10);
      var total = parseInt(counts[2], 10);

      if (!Number.isNaN(complete) && !Number.isNaN(total)) {
        progress.modules = {
          complete: complete,
          total: total
        };
        totalModules = total;
      }
    }

    if (value === 1) {
      if (options.cache) {
        options.cache.set('modulesCount', totalModules);
      }

      if (!progress.message) {
        progress.message = `Completed in ${printDuration(startTime)}.`;
      }
    }

    reportProgress(progress);
  };

  var modulesCount = (await ((_options$cache = options.cache) === null || _options$cache === void 0 ? void 0 : _options$cache.get('modulesCount').catch(function () {}))) || 1000;
  new _webpack.ProgressPlugin({
    handler: handler,
    modulesCount: modulesCount
  }).apply(compiler);
};

var useManagerCache = async function (fsc, managerConfig) {
  // Drop the `cache` property because it'll change as a result of writing to the cache.
  var _ = managerConfig.cache,
      baseConfig = _objectWithoutProperties(managerConfig, ["cache"]);

  var configString = (0, _telejson.stringify)(baseConfig);
  var cachedConfig = await fsc.get('managerConfig').catch(function () {});
  await fsc.set('managerConfig', configString);
  return configString === cachedConfig;
};

var clearManagerCache = async function (fsc) {
  if (fsc && fsc.fileExists('managerConfig')) {
    await fsc.remove('managerConfig');
    return true;
  }

  return false;
};

var startManager = async function ({
  startTime: startTime,
  options: options,
  configType: configType,
  outputDir: outputDir,
  configDir: configDir,
  prebuiltDir: prebuiltDir
}) {
  var _managerConfig$output;

  var managerConfig;

  if (!prebuiltDir) {
    // this is pretty slow
    managerConfig = await (0, _managerConfig.default)(_objectSpread({
      configType: configType,
      outputDir: outputDir,
      configDir: configDir,
      cache: cache,
      corePresets: [require.resolve('./manager/manager-preset.js')]
    }, options));

    if (options.debugWebpack) {
      (0, _logConfig.logConfig)('Manager webpack config', managerConfig);
    }

    if (options.cache && !options.smokeTest) {
      if (options.managerCache) {
        var _await$Promise$all = await Promise.all([// must run even if outputDir doesn't exist, otherwise the 2nd run won't use cache
        useManagerCache(options.cache, managerConfig), (0, _fsExtra.pathExists)(outputDir)]),
            _await$Promise$all2 = _slicedToArray(_await$Promise$all, 2),
            useCache = _await$Promise$all2[0],
            hasOutput = _await$Promise$all2[1];

        if (useCache && hasOutput) {
          _nodeLogger.logger.info('=> Using cached manager');

          managerConfig = null;
        }
      } else if (await clearManagerCache(options.cache)) {
        _nodeLogger.logger.info('=> Cleared cached manager config');
      }
    }
  }

  if (!managerConfig) {
    return {};
  }

  var compiler = (0, _webpack.default)(managerConfig);
  var middleware = (0, _webpackDevMiddleware.default)(compiler, {
    publicPath: (_managerConfig$output = managerConfig.output) === null || _managerConfig$output === void 0 ? void 0 : _managerConfig$output.publicPath,
    writeToDisk: true,
    watchOptions: {
      aggregateTimeout: 2000,
      ignored: /node_modules/
    },
    // this actually causes 0 (regular) output from wdm & webpack
    logLevel: 'warn',
    // @ts-ignore
    clientLogLevel: 'warning',
    noInfo: true
  });
  router.get(/\/static\/media\/.*\..*/, function (request, response, next) {
    response.set('Cache-Control', `public, max-age=31536000`);
    next();
  }); // Used to report back any client-side (runtime) errors

  router.post('/runtime-error', _express.default.json(), function (request, response) {
    var _request$body, _request$body2;

    if ((_request$body = request.body) !== null && _request$body !== void 0 && _request$body.error || (_request$body2 = request.body) !== null && _request$body2 !== void 0 && _request$body2.message) {
      var _request$body$error;

      _nodeLogger.logger.error('Runtime error! Check your browser console.');

      _nodeLogger.logger.error(((_request$body$error = request.body.error) === null || _request$body$error === void 0 ? void 0 : _request$body$error.stack) || request.body.message || request.body);

      if (request.body.origin === 'manager') clearManagerCache(options.cache);
    }

    response.sendStatus(200);
  });
  router.use(middleware);
  var managerStats = await new Promise(function (resolve) {
    return middleware.waitUntilValid(resolve);
  });

  if (!managerStats) {
    await clearManagerCache(options.cache);
    throw new Error('no stats after building manager');
  }

  if (managerStats.hasErrors()) {
    await clearManagerCache(options.cache);
    throw managerStats;
  }

  return {
    managerStats: managerStats,
    managerTotalTime: process.hrtime(startTime)
  };
};

var startPreview = async function ({
  startTime: startTime,
  options: options,
  configType: configType,
  outputDir: outputDir
}) {
  if (options.ignorePreview) {
    return {};
  }

  var previewConfig = await (0, _config.default)(_objectSpread({
    configType: configType,
    outputDir: outputDir,
    cache: cache,
    corePresets: [require.resolve('./preview/preview-preset.js')],
    overridePresets: [require.resolve('./preview/custom-webpack-preset.js')]
  }, options));

  if (options.debugWebpack) {
    (0, _logConfig.logConfig)('Preview webpack config', previewConfig);
  }

  var compiler = (0, _webpack.default)(previewConfig);
  await useProgressReporting(compiler, options, startTime);
  var publicPath = previewConfig.output.publicPath;
  previewProcess = (0, _webpackDevMiddleware.default)(compiler, _objectSpread({
    publicPath: publicPath[0] === '/' ? publicPath.slice(1) : publicPath,
    watchOptions: _objectSpread({
      aggregateTimeout: 1,
      ignored: /node_modules/
    }, previewConfig.watchOptions || {}),
    // this actually causes 0 (regular) output from wdm & webpack
    logLevel: 'warn',
    clientLogLevel: 'warning',
    noInfo: true
  }, previewConfig.devServer));
  router.use(previewProcess);
  router.use((0, _webpackHotMiddleware.default)(compiler));
  var previewStats = await new Promise(function (resolve, reject) {
    previewProcess.waitUntilValid(resolve);
    previewReject = reject;
  });
  if (!previewStats) throw new Error('no stats after building preview');
  if (previewStats.hasErrors()) throw previewStats;
  return {
    previewStats: previewStats,
    previewTotalTime: process.hrtime(startTime)
  };
};

async function storybookDevServer(options) {
  var app = (0, _express.default)();
  var server = await getServer(app, options);

  var configDir = _path.default.resolve(options.configDir);

  var outputDir = options.smokeTest ? (0, _resolvePathInSbCache.resolvePathInStorybookCache)('public') : _path.default.resolve(options.outputDir || (0, _resolvePathInSbCache.resolvePathInStorybookCache)('public'));
  var configType = 'DEVELOPMENT';
  var startTime = process.hrtime();

  if (typeof options.extendServer === 'function') {
    options.extendServer(server);
  }

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  }); // User's own static files

  await useStatics(router, options);
  (0, _middleware.getMiddleware)(configDir)(router);
  app.use(router);
  var port = options.port,
      host = options.host;
  var proto = options.https ? 'https' : 'http';
  var address = `${proto}://${host || 'localhost'}:${port}/`;
  var networkAddress = `${proto}://${_ip.default.address()}:${port}/`;
  await new Promise(function (resolve, reject) {
    // FIXME: Following line doesn't match TypeScript signature at all 🤔
    // @ts-ignore
    server.listen({
      port: port,
      host: host
    }, function (error) {
      return error ? reject(error) : resolve();
    });
  });
  var prebuiltDir = await (0, _prebuiltManager.getPrebuiltDir)({
    configDir: configDir,
    options: options
  }); // Manager static files

  router.use('/', _express.default.static(prebuiltDir || outputDir)); // Build the manager and preview in parallel.
  // Start the server (and open the browser) as soon as the manager is ready.
  // Bail if the manager fails, but continue if the preview fails.

  var _await$Promise$all3 = await Promise.all([startPreview({
    startTime: startTime,
    options: options,
    configType: configType,
    outputDir: outputDir
  }), startManager({
    startTime: startTime,
    options: options,
    configType: configType,
    outputDir: outputDir,
    configDir: configDir,
    prebuiltDir: prebuiltDir
  }) // TODO #13083 Restore this when compiling the preview is fast enough
  // .then((result) => {
  //   if (!options.ci) openInBrowser(address);
  //   return result;
  // })
  .catch(bailPreview)]),
      _await$Promise$all4 = _slicedToArray(_await$Promise$all3, 2),
      previewResult = _await$Promise$all4[0],
      managerResult = _await$Promise$all4[1]; // TODO #13083 Remove this when compiling the preview is fast enough


  if (!options.ci) openInBrowser(address);
  return _objectSpread(_objectSpread(_objectSpread({}, previewResult), managerResult), {}, {
    address: address,
    networkAddress: networkAddress
  });
}