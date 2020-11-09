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
        console.log("[*] Questions Route works")
        const questionsCollection = "Questions"
        //GET specific question base on id
        this.routes.get('/questions/:questionId', async (req, res) => {
            try {
                console.log("[*] /GET specific question works")
                const questionId = req.params.questionId;
                const questionRef = admin.firestore().collection(questionsCollection)
                const question = await questionRef.where('questionId','==', questionId).get()
                const result = []

                question.docs.forEach(doc=>{
                  result.push(doc.data())
                })

                if (result.exists) {
                    throw new Error("Question not found");
                }

                res.status(200).json({
                    data: result
                });
            }
            catch (err) {
                console.log(err)
                res.status(500).json({
                  err: "Little Lamb"
                })
            }
        });

        // GET all Question (NOT FINISH)
        this.routes.get('/questions', async (req, res) => {
            try {
                // Must have pagination *
                console.log('[*] /GET all questions works');
                const snapshot = await admin.firestore().collection(questionsCollection).get()
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
        this.routes.post('/questions', async (req, res) => {
            try {
                console.log("[*] /POST work")
                if (!('title' in req.body)) {
                    throw new Error('Title not found');
                }
                if (!('core' in req.body)) {
                    throw new Error('Core not found');
                }
                if (!('helps' in req.body)) {
                    throw new Error('Helps not found');
                }
                if(!('followUp' in req.body)){
                  throw new Error('followUp not found');
                }

                const newQuestion = {
                  //Just adding new field call questionId
                    title: req.body['title'],
                    core: req.body['core'],
                    helps: req.body['helps']
                };
                const result = await admin.firestore().collection(questionsCollection).add(newQuestion)

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


        this.routes.put('/questions/:questionId', async (req, res) => {
            try {
                console.log("[*] /PUT question work");
                const questionId = req.params.questionId
                //Don't need to check whether it has the field is not
                if(('questionId' in req.body)){
                  throw new Error("questionId reasign is not allowed")
                }

                const questionUpdateInformation = {
                  title: req.body['title'],
                  core: req.body['core'],
                  helps: req.body['helps'],
                  followUp: req.body['followUP']
                }

                const questionUpdated = await admin.firestore().collection(questionsCollection).doc(questionId).update(questionUpdateInformation)
                res.status(201).json({
                  msg: 'success'
                })

            }
            catch (err) {
                console.log(err)
                res.status(500).json({
                  error: "Little Lamb"
                })
            }
        });
    }
}
exports.questionRoutes = new QuestionRoute().routes

