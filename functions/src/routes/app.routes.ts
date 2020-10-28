const express = require('express')
const router = express.Router()
const questionRoute =  require('./questions.routes')


//  Need to import model of the question
//
router.use('/',questionRoute)

// Can I create this thing more easier to modify

module.exports = router
