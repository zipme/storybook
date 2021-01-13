"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = svelteDocgen;

require("regenerator-runtime/runtime");

var _sveltedocParser = _interopRequireDefault(require("sveltedoc-parser"));

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * webpack loader for sveltedoc-parser
 * @param source raw svelte component
 */
function svelteDocgen(_x) {
  return _svelteDocgen.apply(this, arguments);
}

function _svelteDocgen() {
  _svelteDocgen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
    var file, options, docgen, componentDoc, output;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // get filename for source content
            // eslint-disable-next-line no-underscore-dangle
            file = path.basename(this._module.resource); // set SvelteDoc options

            options = {
              fileContent: source,
              version: 3
            };
            docgen = '';
            _context.prev = 3;
            _context.next = 6;
            return _sveltedocParser.default.parse(options);

          case 6:
            componentDoc = _context.sent;
            // populate filename in docgen
            componentDoc.name = path.basename(file);
            docgen = "\n    export const __docgen = ".concat(JSON.stringify(componentDoc), ";\n  ");
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);

          case 14:
            // inject __docgen prop in svelte component
            output = source.replace('</script>', "".concat(docgen, "</script>"));
            return _context.abrupt("return", output);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 11]]);
  }));
  return _svelteDocgen.apply(this, arguments);
}