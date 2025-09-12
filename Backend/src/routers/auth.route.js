const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logout } = require("../controllers/auth.controller.js");
const validation = require('../middleware/validation.middleware.js');

router.post('/register', validation.registerUserValidation, registerUser);
router.post('/login', validation.loginUser, loginUser);
router.post('/logout', logout);

module.exports = router;
