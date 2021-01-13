"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preset = require("../vue/preset");

Object.keys(_preset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _preset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _preset[key];
    }
  });
});