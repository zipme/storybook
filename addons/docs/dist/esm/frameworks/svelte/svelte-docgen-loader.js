import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import svelteDoc from 'sveltedoc-parser';
import * as path from 'path';
/**
 * webpack loader for sveltedoc-parser
 * @param source raw svelte component
 */

export default function svelteDocgen(_x) {
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
            return svelteDoc.parse(options);

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