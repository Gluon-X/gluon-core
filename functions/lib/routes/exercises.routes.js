'use strict'

const express = require('express')
const admin = require('firebase-admin')

class ExerciseRoute {
  constructor() {
    this.routes = express.Router()
    this.exerciseRoute()
  }
  exerciseRoute() {
    const exerciseCollection = 'Exercises'
    console.log('[*] Exercise Route works!')

    // Adding new exercise in the database for presentation purpose
    this.routes.post('/exercise', async (req, res) => {
      try {
        console.log('[*] POST exercise model')

        // Model of exercise and questions should be include here
        const exercise = {
          name: req.body['name'],
          cid: req.body['cid'],
          questions: req.body['questions']
        }

        const exerciseRef = await admin
          .firestore()
          .collection(exerciseCollection)
        const newExercise = exerciseRef.doc().create(exercise)
        res.status(200).json({
          msg: 'Success',
        })
      } catch (err) {
        console.log(err)
        res.status(500).json({
          Error: 'Little Lamb',
        })
      }
    })

    this.routes.get('/exercises/:chapterId', async (req, res) => {
      try {
        console.log('[*] GET all the exercises ')
        const { chapterId } = req.params

        const snapshot = await admin
          .firestore()
          .collection(exerciseCollection)
          .where('cid', '==', chapterId)
          .get()
        const result = []
        if (snapshot.empty) {
          throw new Error('Exercise not found with that cid')
        }
        snapshot.forEach((doc) => {
          result.push(doc.data())
        })
        res.status(200).json({
          data: result
        })
      } catch (err) {
        console.log(err)
        res.status(500).json({
          Error: 'Little Lamb',
        })
      }
    })
  }
}

exports.exerciseRoutes = new ExerciseRoute().routes
