"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderNgAppService_1 = require("./angular-beta/RenderNgAppService");
var helpers_1 = require("./angular/helpers");
// add proper types
function render(_a) {
    var storyFn = _a.storyFn, showMain = _a.showMain, forceRender = _a.forceRender, parameters = _a.parameters;
    showMain();
    if (parameters.angularLegacyRendering) {
        helpers_1.renderNgApp(storyFn, forceRender);
        return;
    }
    RenderNgAppService_1.RenderNgAppService.getInstance().render(storyFn, forceRender);
}
exports.default = render;
