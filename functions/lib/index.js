"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gluonApi = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const serviceAccount = require("./configs/config");
// App routes
const app_routes_1 = require("./routes/app.routes");
const { questionRoutes } = require("./routes/questions.routes");
const { chapterRoutes } = require("./routes/chapters.routes");

const PORT = process.env.PORT || 3000;
const VERSION = '/api/v1'
// Connect with firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default),
    databaseURL: 'https://enq-mobile.firebaseio.com',
});
// Express app
class ExpressApp {
    constructor() {
        this.app = express();
        this._init();
    }
    // Init configs
    _init() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
const app = new ExpressApp().app;
app.use(cors())
app.get('/', (req, res) => {
    res.send("<h1>This is testing/h1>");
});
// Use app routes

// CURRENTLY /api/v1
app.use(VERSION, questionRoutes);
app.use(VERSION, chapterRoutes);

// Listen Express app
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
exports.gluonApi = functions.https.onRequest(app);

