import path from 'path';
import { serverRequire } from './server-require';
var webpackConfigs = ['webpack.config', 'webpackfile'];
export default (function (configDir) {
  return serverRequire(webpackConfigs.map(function (configName) {
    return path.resolve(configDir, configName);
  }));
});