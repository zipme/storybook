"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parameters = void 0;

var _extractArgTypes = require("./extractArgTypes");

var _docgen = require("../../lib/docgen");

var _prepareForInline = require("./prepareForInline");

var parameters = {
  docs: {
    inlineStories: true,
    prepareForInline: _prepareForInline.prepareForInline,
    extractArgTypes: _extractArgTypes.extractArgTypes,
    extractComponentDescription: _docgen.extractComponentDescription
  }
}; // TODO: Implement source decorator for Vue3
// export const decorators = [sourceDecorator];

exports.parameters = parameters;