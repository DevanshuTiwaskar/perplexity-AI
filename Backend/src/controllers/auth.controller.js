const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerUser(req,res) {
    const { username, email,fullName:{firstName,lastname},password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            
                {username},
                {email}
            
        ]
    })


    if(isUserAlreadyExists){
        return res.status(422).json({message: "user is alreadyExists"})
    }


    const hashedpassword = await bcrypt.hash(password,10)


    const user = await userModel.create({
        username,
        email,
        fullName:{
            firstName,
            lastName
        },
        password:hashedpassword
    })

    const token  = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message: "user create successfully",
        user: {
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
    })
}


const loginUser = async (req,res) =>{
  
   const {email, password } = req.body

   const user = await userModel.findOne({email})
   
   if(!user){
    res.status(401).json({
        message:"Invalid credentails"
    })
   }
    

   const isPasswordValid = await bcrypt.compare(password,user.password)


   if(!isPasswordValid){
    res.status(401).json({
        message: "Invalid credentails"
    })
   }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

 
     res.cookie("token",token)
     
     res.status(201).json({
        message: "user login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
     })


}



const logout = async (req,res)=>{

    const token = req.cookies.token

    if(token){
        await radis.set(`blacklist:${token}`,true,"EX", 60 * 60 * 24)
    }
     res.clearCookie('token')


     res.status(200).json({
        message: "user logout successfully"
     })
}

module.exports = {
    registerUser,
    loginUser,
    logout
}