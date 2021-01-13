function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import createForkTsCheckerInstance from './create-fork-ts-checker-plugin';
import getTsLoaderOptions from './ts_config';
export function webpack(config, {
  configDir: configDir
}) {
  var tsLoaderOptions = getTsLoaderOptions(configDir);
  return _objectSpread(_objectSpread({}, config), {}, {
    resolve: _objectSpread(_objectSpread({}, config.resolve), {}, {
      extensions: [...config.resolve.extensions, '.ts', '.js'],
      modules: [...config.resolve.modules, 'src', 'node_modules']
    }),
    module: _objectSpread(_objectSpread({}, config.module), {}, {
      rules: [...config.module.rules, {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: `${require.resolve('url-loader')}?limit=100000`
      }, {
        test: /\.css$/i,
        issuer: [{
          not: [{
            test: /\.html$/i
          }]
        }],
        use: [{
          loader: require.resolve('style-loader')
        }, {
          loader: require.resolve('css-loader')
        }]
      }, {
        test: /\.css$/i,
        issuer: [{
          test: /\.html$/i
        }],
        // CSS required in templates cannot be extracted safely
        // because Aurelia would try to require it again in runtime
        use: require.resolve('css-loader')
      }, {
        test: /\.scss$/,
        use: [{
          loader: require.resolve('style-loader')
        }, {
          loader: require.resolve('css-loader')
        }, {
          loader: require.resolve('sass-loader')
        }],
        issuer: /\.[tj]s$/i
      }, {
        test: /\.scss$/,
        use: [{
          loader: require.resolve('css-loader')
        }, {
          loader: require.resolve('sass-loader')
        }],
        issuer: /\.html?$/i
      }, {
        test: /\.ts$/i,
        use: [{
          loader: require.resolve('ts-loader')
        }, {
          loader: require.resolve('@aurelia/webpack-loader')
        }],
        exclude: /node_modules/
      }, {
        test: /\.html$/i,
        use: require.resolve('@aurelia/webpack-loader'),
        exclude: /node_modules/
      }]
    }),
    plugins: [...config.plugins, createForkTsCheckerInstance(tsLoaderOptions)]
  });
}