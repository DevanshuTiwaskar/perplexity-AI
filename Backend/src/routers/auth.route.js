const express = require('express')
const authRouter = require("../controllers/auth.controller.js")
const router =  express.Router()

const validation = require('../middleware/validation.middleware.js')





router.post('/register',validation.registerUserValidation,authRouter.registerUser)
router.post('/login',validation.loginUser,authRouter.loginUser)
router.post('/logout',authRouter.loginUser)

module.exports=router