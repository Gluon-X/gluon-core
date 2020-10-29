"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = require("express");
const admin = require("firebase-admin");
class QuestionRoute {
    constructor() {
        this.routes = express_1.Router();
        this.questionRoute()
    }
    // Route for question
      questionRoute() {
        console.log("[*] Question Route works")
        const questionCollection = "Questions"
        //GET specific question base on id
        this.routes.get('/question/:questionId', async (req, res) => {
            try {
                console.log("[*] /GET specific question works")
                const questionId = req.params.questionId;


                const result = await admin.firestore().collection(questionCollection).doc(questionId).get();
                
                if (!result.exists) {
                    throw new Error("Question not found");
                }
                res.status(200).json({
                    data: result.data()
                });
            }

            catch (err) {
                res.status(500).json({
                  err: "Little Lamb"
                })
            }
        });

        // GET all Question (NOT FINISH)
        this.routes.get('/question', async (req, res) => {
            try {
                // Must have pagination *
                console.log('[*] /GET all questions works');
                const snapshot = await admin.firestore().collection(questionCollection).get()
                const result = []
                snapshot.forEach(doc=> {
                  result.push(doc.data())
                });
                if (result.empty) {
                    throw new Error("Database is empty");
                }
                res.status(200).json({
                    data: result
                });
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
        //POST adding question
        this.routes.post('/question', async (req, res) => {
            try {
                console.log("[*] /POST work")
                // Không biết cái này có đúng không
                if (!('title' in req.body)) {
                    throw new Error('Title not found');
                }
                if (!('core' in req.body)) {
                    throw new Error('Core not found');
                }
                if (!('helps' in req.body)) {
                    throw new Error('Helps not found');
                }

                const question = {
                    title: req.body['title'],
                    core: req.body['core'],
                    helps: req.body['helps']
                };
                let result = await admin.firestore().collection(questionCollection).doc().create(question);
                console.log(result);
                res.status(200).json({
                  msg: "success"
                })
            }
            catch (err) {
                console.log(err)
                res.status(500).json({
                  error: "Little Lamb"
                })
            }
        });


        this.routes.put('/question/:questionId', async (req, res) => {
            try {
                console.log("[*] /PUT question work");

            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.questionRoutes = new QuestionRoute().routes
//# sourceMappingURL=questions.routes.js.map
