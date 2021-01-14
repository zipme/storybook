import "core-js/modules/es.symbol";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.values";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.search";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { history, document } from 'global';
import qs from 'qs';
import deprecate from 'util-deprecate';
export function pathToId(path) {
  var match = (path || '').match(/^\/story\/(.+)/);

  if (!match) {
    throw new Error("Invalid path '".concat(path, "',  must start with '/story/'"));
  }

  return match[1];
} // todo add proper types

export var setPath = function setPath(selection) {
  if (!selection) {
    return;
  }

  var storyId = selection.storyId,
      viewMode = selection.viewMode;
  var _document$location = document.location,
      search = _document$location.search,
      hash = _document$location.hash;

  var _qs$parse = qs.parse(search, {
    ignoreQueryPrefix: true
  }),
      path = _qs$parse.path,
      selectedKind = _qs$parse.selectedKind,
      selectedStory = _qs$parse.selectedStory,
      rest = _objectWithoutProperties(_qs$parse, ["path", "selectedKind", "selectedStory"]);

  var newPath = "".concat(document.location.pathname, "?").concat(qs.stringify(Object.assign({}, rest, {
    id: storyId,
    viewMode: viewMode
  }))).concat(hash || '');
  history.replaceState({}, '', newPath);
};
export var parseQueryParameters = function parseQueryParameters(search) {
  var _qs$parse2 = qs.parse(search, {
    ignoreQueryPrefix: true
  }),
      id = _qs$parse2.id;

  return id;
};

var isObject = function isObject(val) {
  return val != null && _typeof(val) === 'object' && Array.isArray(val) === false;
};

var getFirstString = function getFirstString(v) {
  if (typeof v === 'string') {
    return v;
  }

  if (Array.isArray(v)) {
    return getFirstString(v[0]);
  }

  if (isObject(v)) {
    // @ts-ignore
    return getFirstString(Object.values(v));
  }

  return undefined;
};

var deprecatedLegacyQuery = deprecate(function () {
  return 0;
}, "URL formats with `selectedKind` and `selectedName` query parameters are deprecated. \nUse `id=$storyId` instead. \nSee https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-url-structure");
export var getSelectionSpecifierFromPath = function getSelectionSpecifierFromPath() {
  var query = qs.parse(document.location.search, {
    ignoreQueryPrefix: true
  });
  var viewMode = getFirstString(query.viewMode);

  if (typeof viewMode !== 'string' || !viewMode.match(/docs|story/)) {
    viewMode = 'story';
  }

  var path = getFirstString(query.path);
  var storyId = path ? pathToId(path) : getFirstString(query.id);

  if (storyId) {
    return {
      storySpecifier: storyId,
      viewMode: viewMode
    };
  } // Legacy URL format


  var kind = getFirstString(query.selectedKind);
  var name = getFirstString(query.selectedStory);

  if (kind && name) {
    deprecatedLegacyQuery();
    return {
      storySpecifier: {
        kind: kind,
        name: name
      },
      viewMode: viewMode
    };
  }

  return null;
};