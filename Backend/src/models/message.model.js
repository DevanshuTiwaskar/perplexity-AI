const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
   chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "chat",   // matches your Chat model
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",   // matches your User model
    required: true
  },
  role: {
    type: String,
    enum:['user',"model"],
    default: 'user'
  },
  text: {
    type: String,
    required: true
  },
},
{timestamps:true}
)



const messageModel = mongoose.model("message",messageSchema)

module.exports = messageModel