"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const express_1 = require("express");
const questions_routes_1 = require("./questions.routes");
const chapters_routes_1 = require("./chapters.routes");
//  Need to import model of the question
//
class AppRoutes {
    constructor() {
        this.routes = express_1.Router();
    }
    // Core route of the Question
    async core() {
        console.log("API Work")
        this.routes.use('/', questions_routes_1.questionRoutes);
        this.routes.use('/', chapters_routes_1.chapterRoutes);
    }
}

exports.appRoutes = new AppRoutes().routes;
//# sourceMappingURL=app.routes.js.map
