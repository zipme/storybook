import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.map";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "regenerator-runtime/runtime";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { document } from 'global';
import { Aurelia, JitHtmlBrowserConfiguration, DebugConfiguration, CustomElement } from 'aurelia';
import { generateKnobsFor } from '.';
var host = document.getElementById('root'); // the root iframe provided by storybook

var previousAurelia;
export default function render(_x) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var storyFn, selectedKind, selectedStory, showMain, showError, element, _previousAurelia, _previousAurelia$cont, isConstructable, template, def, State, App, app;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storyFn = _ref.storyFn, selectedKind = _ref.selectedKind, selectedStory = _ref.selectedStory, showMain = _ref.showMain, showError = _ref.showError;
            element = storyFn();

            if (!element) {
              showError({
                title: "Expecting an Aurelia component from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
                description: "\n        Did you forget to return the Aurelia component from the story?\n        Use \"() => ({ template: '<custom-component></custom-component>' })\" when defining the story.\n      "
              });
            }

            showMain();

            if (!previousAurelia) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return previousAurelia.stop().wait();

          case 7:
            previousAurelia = new Aurelia(element.container);

            if (element.items && element.items.length > 0) {
              (_previousAurelia = previousAurelia).register.apply(_previousAurelia, _toConsumableArray(element.items));
            } else {
              previousAurelia.register(JitHtmlBrowserConfiguration, DebugConfiguration);
            }

            if (element.components && element.components.length > 0) {
              (_previousAurelia$cont = previousAurelia.container).register.apply(_previousAurelia$cont, _toConsumableArray(element.components));
            }

            isConstructable = element.state && element.state.prototype;
            template = element.template;

            if (element.customElement) {
              def = CustomElement.getDefinition(element.customElement);
              template = "<".concat(def.name, " ").concat(Object.keys(def.bindables).map(function (key) {
                return "".concat(def.bindables[key].attribute, ".bind=\"").concat(def.bindables[key].property, "\" ");
              }).join(' '), "  ></").concat(def.name, ">");
              previousAurelia.register(element.customElement);
            }

            State = function State() {
              _classCallCheck(this, State);
            };

            if (element.state) {
              State = isConstructable ? element.state : State;
            } else if (element.customElement) {
              State = generateKnobsFor(element.customElement);
            }

            App = CustomElement.define({
              name: 'app',
              template: template
            }, State);

            if ((element.customElement || element.state) && !isConstructable) {
              app = Object.assign(new App(), element.state || State);
            }

            _context.next = 19;
            return previousAurelia.app({
              host: host,
              component: app || App
            }).start().wait();

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _render.apply(this, arguments);
}