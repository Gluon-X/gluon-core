"use strict"

const express_1 = require('express')
const admin = require('firebase-admin')



class GeneralRoute{
  constructor(){
    this.routes = express_1.Router()
    this.generalRoute()
  }

  generalRoute(){
    const exerciseCollection = "Exercises"
    console.log("[*] General Route works!")
    //To get all the thing
    this.routes.get('/general',async (req,res)=>{
      try {
        console.log("[*] General Get all the data is working")

      } catch (err) {
        res.status(500).json({
          error: "Little Lamb"
        })
      }
    })

    // Search API for the name of the execise or the name of the quiz?
    // TODO should the search api have pagination
    // TODO fix the search api
    this.routes.get('/search',async(req,res)=>{
      try{
        console.log("[*] GET Search work!")
        const {name, qname } = req.query
        console.log(name)
        console.log(qname)
        const result = []
        // Get the exact name and or try the best name for it
        // name of exercise and name of questions
        const exerciseRef = await admin.firestore().collection(exerciseCollection)
        const exercises = await exerciseRef.where("name","==",name).get()
        const questions = await exerciseRef.where("questions","array-contains-any",qname).get()

        if (exercises.empty && questions.empty){
          console.log("Can't find anything")
          throw new Error("Can't find anything")
        }

        // Pushing all the data in to an array
        // TODO test this functions
        exercises.forEach(doc =>{
          result.push(doc.data())
        })

        questions.forEach(doc=>{
          result.push(doc.data())
        })

        res.status(200).json({
            data: result
        })

      }catch(err){
        console.log(err)
        res.status(500).json({
          error: "Little Lamb"
        })
      }
    })
  }
}

exports.generalRoutes = new GeneralRoute().routes
