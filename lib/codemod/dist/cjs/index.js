"use strict";

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listCodemods = listCodemods;
exports.runCodemod = runCodemod;
Object.defineProperty(exports, "updateOrganisationName", {
  enumerable: true,
  get: function () {
    return _updateOrganisationName.default;
  }
});
Object.defineProperty(exports, "packageNames", {
  enumerable: true,
  get: function () {
    return _updateOrganisationName.packageNames;
  }
});
Object.defineProperty(exports, "updateAddonInfo", {
  enumerable: true,
  get: function () {
    return _updateAddonInfo.default;
  }
});

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _globby = _interopRequireDefault(require("globby"));

var _crossSpawn = require("cross-spawn");

var _updateOrganisationName = _interopRequireWildcard(require("./transforms/update-organisation-name"));

var _updateAddonInfo = _interopRequireDefault(require("./transforms/update-addon-info"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TRANSFORM_DIR = `${__dirname}/transforms`;

function listCodemods() {
  return _fs.default.readdirSync(TRANSFORM_DIR).filter(function (fname) {
    return fname.endsWith('.js');
  }).map(function (fname) {
    return fname.slice(0, -3);
  });
}

var renameAsync = (0, _util.promisify)(_fs.default.rename);

async function renameFile(file, from, to, {
  logger: logger
}) {
  var newFile = file.replace(from, to);
  logger.log(`Rename: ${file} ${newFile}`);
  return renameAsync(file, newFile);
}

async function runCodemod(codemod, {
  glob: glob,
  logger: logger,
  dryRun: dryRun,
  rename: rename,
  parser: parser
}) {
  var codemods = listCodemods();

  if (!codemods.includes(codemod)) {
    throw new Error(`Unknown codemod ${codemod}. Run --list for options.`);
  }

  var renameParts = null;

  if (rename) {
    renameParts = rename.split(':');

    if (renameParts.length !== 2) {
      throw new Error(`Codemod rename: expected format "from:to", got "${rename}"`);
    }
  }

  var files = await (0, _globby.default)([glob, '!node_modules', '!dist']);
  logger.log(`=> Applying ${codemod}: ${files.length} files`);

  if (!dryRun) {
    var parserArgs = parser ? ['--parser', parser] : [];
    (0, _crossSpawn.sync)('npx', ['jscodeshift', '-t', `${TRANSFORM_DIR}/${codemod}.js`, ...parserArgs, ...files], {
      stdio: 'inherit'
    });
  }

  if (renameParts) {
    var _renameParts = renameParts,
        _renameParts2 = _slicedToArray(_renameParts, 2),
        from = _renameParts2[0],
        to = _renameParts2[1];

    logger.log(`=> Renaming ${rename}: ${files.length} files`);
    await Promise.all(files.map(function (file) {
      return renameFile(file, new RegExp(`${from}$`), to, {
        logger: logger
      });
    }));
  }
}