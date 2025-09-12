const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({
   chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",   // matches your Chat model
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // matches your User model
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
})



const messageModel = mongoose.model("message",messageSchema)

module.exports = messageModel