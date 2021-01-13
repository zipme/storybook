import path from 'path';
import fs from 'fs';
export function getMiddleware(configDir) {
  var middlewarePath = path.resolve(configDir, 'middleware.js');

  if (fs.existsSync(middlewarePath)) {
    var middlewareModule = require(middlewarePath); // eslint-disable-line


    if (middlewareModule.__esModule) {
      // eslint-disable-line
      middlewareModule = middlewareModule.default;
    }

    return middlewareModule;
  }

  return function () {};
}