
const mongoose = require("mongoose")



const connnectdb = ()=>{


    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("databse is connected successfully")
    })
    .catch((err)=>{
        console.log("error in database =",err)
    })
}


module.exports = connnectdb