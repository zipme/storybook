"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreviewBodyHtml = getPreviewBodyHtml;
exports.getPreviewHeadHtml = getPreviewHeadHtml;
exports.getManagerHeadHtml = getManagerHeadHtml;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolate = function (string, data = {}) {
  return Object.entries(data).reduce(function (acc, [k, v]) {
    return acc.replace(new RegExp(`%${k}%`, 'g'), v);
  }, string);
};

function getPreviewBodyHtml(configDirPath, interpolations) {
  var base = _fs.default.readFileSync(_path.default.resolve(__dirname, '../templates/base-preview-body.html'), 'utf8');

  var bodyHtmlPath = _path.default.resolve(configDirPath, 'preview-body.html');

  var result = base;

  if (_fs.default.existsSync(bodyHtmlPath)) {
    result = _fs.default.readFileSync(bodyHtmlPath, 'utf8') + result;
  }

  return interpolate(result, interpolations);
}

function getPreviewHeadHtml(configDirPath, interpolations) {
  var base = _fs.default.readFileSync(_path.default.resolve(__dirname, '../templates/base-preview-head.html'), 'utf8');

  var headHtmlPath = _path.default.resolve(configDirPath, 'preview-head.html');

  var result = base;

  if (_fs.default.existsSync(headHtmlPath)) {
    result += _fs.default.readFileSync(headHtmlPath, 'utf8');
  }

  return interpolate(result, interpolations);
}

function getManagerHeadHtml(configDirPath, interpolations) {
  var base = _fs.default.readFileSync(_path.default.resolve(__dirname, '../templates/base-manager-head.html'), 'utf8');

  var scriptPath = _path.default.resolve(configDirPath, 'manager-head.html');

  var result = base;

  if (_fs.default.existsSync(scriptPath)) {
    result += _fs.default.readFileSync(scriptPath, 'utf8');
  }

  return interpolate(result, interpolations);
}