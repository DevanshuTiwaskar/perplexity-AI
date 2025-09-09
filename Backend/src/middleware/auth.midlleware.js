const redis = require("../db/redis")
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')



const verifyToken = async (req,res,next) =>{

   const token = req.cookies.token

   if(!token) return res.status(401).json({message: "unauthorized"})

   const isTokenBlacklisted = await redis.get(`blacklist: ${token}`)
   if(isTokenBlacklisted) return res.status(401).json({message: "unauthorized"})

    try {
        
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
            req.user = decoded
        
    } catch (error) {
        
        return res.status(401).json({
            message: "unauthorized"
        })
    }
 next()
}


module.exports = {verifyToken}