"use strict"

const express_1 = require('express')
const admin = require('firebase-admin')



class GeneralRoute{
  constructor(){
    this.routes = express_1.Router()
    this.generalRoute()
  }
  generalRoute(){
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
  }
}

exports.generalRoutes = new GeneralRoute().routes
