"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chapterRoutes = void 0;

const express_1 = require("express");
const admin = require('firebase-admin')

class ChapterRoute {
    constructor() {
        this.routes = express_1.Router();
        this.chapterRoutes()
    }

    chapterRoutes(){
      const chapterCollection = "Chapter"

      this.routes.get('/chapters',async (req,res)=>{
        try {
          console.log("[*] GET chapters")
          const snapshot = await admin.firestore().collection(chapterCollection).get()

          if(snapshot.empty){
            throw new Error('Collection Chapter not found')
          }

          const result = []
          snapshot.forEach(doc =>{
            result.push(doc.data())
          })

          res.status(200).json({
            data: result
          })

        } catch (err) {
          console.log(err)
          res.status(500).json({
            error: "Little Lamb"
          })
        }
      })
      //This is adding the chapter
      this.routes.post('/chapters',async (req,res)=>{
        try {
            console.log('[*] POST chapter')
            if (!('name ' in req.body)){
              throw new Error('Name not found')
            }


            // Not adding any question because you need to create a chapter before you can add any question
            const newChapter = {

              chapterId: req.body['chapterId'],
              name: req.body['name'],
              //question is contain all the
              questions: req.body['questions'],
              description: req.body['description'],
              relatedResources: req.body['relatedResources'],
              thumbnailUrl: req.body['thumbnailUrl']
            }

            const result = await admin.firestore().collection(chapterCollection).doc().create(newChapter)

            res.status(200).json({
              msg: 'success'
            })

        } catch (err) {
          console.log(err)
          res.status(500).json({
            error : "Little Lamb"
          })
        }
      })
    }
}
exports.chapterRoutes = new ChapterRoute().routes;
//# sourceMappingURL=chapters.routes.js.map
