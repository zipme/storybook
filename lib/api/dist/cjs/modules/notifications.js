"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var init = function init(_ref) {
  var store = _ref.store;
  var api = {
    addNotification: function addNotification(notification) {
      // Get rid of it if already exists
      api.clearNotification(notification.id);

      var _store$getState = store.getState(),
          notifications = _store$getState.notifications;

      store.setState({
        notifications: [].concat(_toConsumableArray(notifications), [notification])
      });
    },
    clearNotification: function clearNotification(id) {
      var _store$getState2 = store.getState(),
          notifications = _store$getState2.notifications;

      store.setState({
        notifications: notifications.filter(function (n) {
          return n.id !== id;
        })
      });
      var notification = notifications.find(function (n) {
        return n.id === id;
      });

      if (notification && notification.onClear) {
        notification.onClear();
      }
    }
  };
  var state = {
    notifications: []
  };
  return {
    api: api,
    state: state
  };
};

exports.init = init;