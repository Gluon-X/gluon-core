import { Router } from 'express'
import * as admin from 'firebase-admin'
import { Quiz } from '../models'

const router = Router()
// Route for question
const db = admin.firestore()
const questionCollection = 'Questions'
// GET specific question base on id
router.get('/question/:questionId', async (req, res) => {
  try {
    const questionId = req.params.questionId
    const result = await db.collection(questionCollection).doc(questionId).get()

    if (!result.exists) {
      throw new Error('Question not found')
    }

    res.status(200).json({
      data: result.data(),
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

// GET all Question (NOT FINISH)
router.get('/questions', async (req, res) => {
  try {
    // Must have pagination *
    console.log('[*] /GET all questions works')
    const result = await db.collection(questionCollection).get()
    if (!result.empty) {
      throw new Error('Database is empty')
    }
    res.status(200).json({
      data: result,
    })
  } catch (err) {
    res.status(500).send(err)
  }
})

//  POST adding question
router.post('/question', async (req, res) => {
  try {
    // Không biết cái này có đúng không
    if (!('title' in req.body)) {
      throw new Error('Title not found')
    }

    if ('core' in req.body) {
      throw new Error('Core not found')
    }

    if ('helps' in req.body) {
      throw new Error('Helps not found')
    }
    // Question interface
    // Mai hỏi minh về cái này
    const question: Quiz = {
      title: req.body['title'],
      core: req.body['core'],
      helps: req.body['helps'],
    }
    let result = await db.collection(questionCollection).doc().create(question)
    console.log(result)
  } catch (err) {
    res.status(500).send(err)
  }
})

//PUT or UPDATE question
router.put('/question/:questionId', async (req, res) => {
  try {
    console.log('[*] /PUT question work')
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
