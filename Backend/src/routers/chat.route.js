const express = require("express");

const router = express.Router();

const chatController = require("../controllers/chat.controller");

const validation = require("../middleware/validation.middleware");
const authMiddleware = require("../middleware/auth.midlleware");

router.post(
  "/",
  validation.validateChat,
  authMiddleware.verifyToken,
  chatController.createChat
);

module.exports = router;
