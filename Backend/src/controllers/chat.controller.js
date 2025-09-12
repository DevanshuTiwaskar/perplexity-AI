const chatModel = require("../models/chat.model");

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

    console.log(error);


    return res.status(400).json({
      message: error.message,
    });
    
  }
}

module.exports = {
  createChat,
};
