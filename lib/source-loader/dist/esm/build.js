import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.map";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
import "regenerator-runtime/runtime";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { SourceMapConsumer, SourceNode } from 'source-map';
import { readStory } from './dependencies-lookup/readAsObject';
export function transform(_x, _x2) {
  return _transform.apply(this, arguments);
}

function _transform() {
  _transform = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(inputSource, inputSourceMap) {
    var _this = this;

    var callback, sourceObject, source, sourceJson, addsMap, sourceNode, preamble, _sourceNode$toStringW, code, map;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = this.async();
            _context.prev = 1;
            _context.next = 4;
            return readStory(this, inputSource);

          case 4:
            sourceObject = _context.sent;

            if (!(!sourceObject.source || sourceObject.source.length === 0)) {
              _context.next = 8;
              break;
            }

            callback(null, inputSource, inputSourceMap);
            return _context.abrupt("return");

          case 8:
            source = sourceObject.source, sourceJson = sourceObject.sourceJson, addsMap = sourceObject.addsMap; // Use the SourceNode to produce the code. Given that the source mapping here is trivial it's easier to just
            // always build a sourcemap rather than to have two different code paths.

            if (!inputSourceMap) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return SourceMapConsumer.with(JSON.stringify(inputSourceMap), null, function (consumer) {
              return SourceNode.fromStringWithSourceMap(source, consumer);
            });

          case 12:
            sourceNode = _context.sent;
            _context.next = 18;
            break;

          case 15:
            // Build an identity sourcemap. Note that "source" is already potentially differing from "inputSource"
            // due to other loaders, so while we need to use "source" for the source node contents to generate the correct
            // code, we still want to use "inputSource" as the source content.
            sourceNode = new SourceNode();
            sourceNode.add(source.split(/\n/).map(function (line, index) {
              return new SourceNode(index + 1, 0, _this.resourcePath, "".concat(line, "\n"));
            }));
            sourceNode.setSourceContent(this.resourcePath, inputSource);

          case 18:
            // Prepend the preamble
            preamble = "\n      /* eslint-disable */\n      // @ts-nocheck\n      // @ts-ignore\n      var __STORY__ = ".concat(sourceJson, ";\n      // @ts-ignore\n      var __LOCATIONS_MAP__ = ").concat(JSON.stringify(addsMap), ";");
            sourceNode.prepend("".concat(preamble, "\n")); // Generate the code and the source map for the next loader

            _sourceNode$toStringW = sourceNode.toStringWithSourceMap(), code = _sourceNode$toStringW.code, map = _sourceNode$toStringW.map;
            callback(null, code, map);
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](1);
            callback(_context.t0);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 24]]);
  }));
  return _transform.apply(this, arguments);
}