"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterRoutes = void 0;
const express_1 = require("express");
class ChapterRoute {
    constructor() {
        this.routes = express_1.Router();
    }
}
exports.chapterRoutes = new ChapterRoute().routes;
//# sourceMappingURL=chapters.routes.js.map