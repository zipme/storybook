"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructUrl = void 0;
var url_1 = require("url");
exports.constructUrl = function (storybookUrl, id) {
    var storyUrl = "/iframe.html?id=" + id;
    var _a = new url_1.URL(storybookUrl), protocol = _a.protocol, host = _a.host, pathname = _a.pathname, search = _a.search;
    var pname = pathname.replace(/\/$/, ''); // removes trailing /
    var query = search.replace('?', '&'); // convert leading ? to &
    return protocol + "//" + host + pname + storyUrl + query;
};
