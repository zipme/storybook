import { includePaths } from '../config/utils';
import { useBaseTsSupport } from '../config/useBaseTsSupport';
export var createBabelLoader = function (options, framework) {
  return {
    test: useBaseTsSupport(framework) ? /\.(mjs|tsx?|jsx?)$/ : /\.(mjs|jsx?)$/,
    use: [{
      loader: require.resolve('babel-loader'),
      options: options
    }],
    include: includePaths,
    exclude: /node_modules/
  };
};