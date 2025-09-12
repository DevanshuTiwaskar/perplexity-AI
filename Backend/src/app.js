const express = require('express')
const app = express()
const cookieparser = require("cookie-parser") 
const authRouter = require('./routers/auth.route')
const chatRouter = require("./routers/chat.route")


app.use(express.json());
app.use(cookieparser())




app.use('/api/auth',authRouter)
app.use('/api/chat',chatRouter)




module.exports = app