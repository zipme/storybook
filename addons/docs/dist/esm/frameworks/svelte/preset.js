import path from 'path';
export function webpackFinal(webpackConfig) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  webpackConfig.module.rules.push({
    test: /\.svelte$/,
    loader: path.resolve("".concat(__dirname, "/svelte-docgen-loader")),
    enforce: 'pre'
  });
  return webpackConfig;
}