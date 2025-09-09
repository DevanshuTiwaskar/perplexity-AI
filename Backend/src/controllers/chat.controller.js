const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");

async function createChat(req, res) {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(404).json({
        message: "tilte is required",
      });
    }

    const chat = await chatModel.create({
      title,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
    console.log(error);
  }
}

module.exports = {
  createChat,
};
