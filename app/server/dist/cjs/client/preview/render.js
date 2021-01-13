"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.search");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMain = renderMain;

require("regenerator-runtime/runtime");

var _global = require("global");

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _clientApi = require("@storybook/client-api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the HTML snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var rootElement = _global.document.getElementById('root');

var defaultFetchStoryHtml = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, path, params) {
    var fetchUrl, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchUrl = new URL("".concat(url, "/").concat(path));
            fetchUrl.search = new URLSearchParams(params).toString();
            _context.next = 4;
            return (0, _global.fetch)(fetchUrl);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", response.text());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function defaultFetchStoryHtml(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var buildStoryArgs = function buildStoryArgs(args, argTypes) {
  var storyArgs = Object.assign({}, args);
  Object.keys(argTypes).forEach(function (key) {
    var argType = argTypes[key];
    var control = argType.control;
    var controlType = control && control.type.toLowerCase();
    var argValue = storyArgs[key];

    switch (controlType) {
      case 'date':
        // For cross framework & language support we pick a consistent representation of Dates as strings
        storyArgs[key] = new Date(argValue).toISOString();
        break;

      case 'array':
        {
          // use the supplied separator when serializing an array as a string
          var separator = control.separator || ',';
          storyArgs[key] = argValue.join(separator);
          break;
        }

      case 'object':
        // send objects as JSON strings
        storyArgs[key] = JSON.stringify(argValue);
        break;

      default:
    }
  });
  return storyArgs;
};

function renderMain(_x4) {
  return _renderMain.apply(this, arguments);
}

function _renderMain() {
  _renderMain = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var id, kind, name, showMain, showError, forceRender, parameters, storyFn, args, argTypes, storyArgs, _parameters$server, url, storyId, _parameters$server$fe, fetchStoryHtml, params, fetchId, fetchParams, element;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref2.id, kind = _ref2.kind, name = _ref2.name, showMain = _ref2.showMain, showError = _ref2.showError, forceRender = _ref2.forceRender, parameters = _ref2.parameters, storyFn = _ref2.storyFn, args = _ref2.args, argTypes = _ref2.argTypes;
            // Some addons wrap the storyFn so we need to call it even though Server doesn't need the answer
            storyFn();
            storyArgs = buildStoryArgs(args, argTypes);
            _parameters$server = parameters.server, url = _parameters$server.url, storyId = _parameters$server.id, _parameters$server$fe = _parameters$server.fetchStoryHtml, fetchStoryHtml = _parameters$server$fe === void 0 ? defaultFetchStoryHtml : _parameters$server$fe, params = _parameters$server.params;
            fetchId = storyId || id;
            fetchParams = Object.assign({}, params, storyArgs);
            _context2.next = 8;
            return fetchStoryHtml(url, fetchId, fetchParams);

          case 8:
            element = _context2.sent;
            showMain();

            if (!(typeof element === 'string')) {
              _context2.next = 15;
              break;
            }

            rootElement.innerHTML = element;
            (0, _clientApi.simulatePageLoad)(rootElement);
            _context2.next = 24;
            break;

          case 15:
            if (!(element instanceof _global.Node)) {
              _context2.next = 23;
              break;
            }

            if (!(rootElement.firstChild === element && forceRender === true)) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return");

          case 18:
            rootElement.innerHTML = '';
            rootElement.appendChild(element);
            (0, _clientApi.simulateDOMContentLoaded)();
            _context2.next = 24;
            break;

          case 23:
            showError({
              title: "Expecting an HTML snippet or DOM node from the story: \"".concat(name, "\" of \"").concat(kind, "\"."),
              description: (0, _tsDedent.default)(_templateObject())
            });

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _renderMain.apply(this, arguments);
}