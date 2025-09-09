const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  title: {
    type: String,
    default: "New Chat",
  },
});

const chatModel = mongoose.model("chats", chatSchema);
module.exports = chatModel;
