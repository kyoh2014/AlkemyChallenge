const express = require('express');
const { signInController,
    signUpController, 
    authController } = require('../controllers/authenticationController')
const { validateToken } = require("../middlewares/validation")

const router = express.Router();

// Login
router.post('/signIn', signInController)

//Register
router.post('/signUp', signUpController)

//User Authentication
router.get('/', validateToken, authController)


module.exports = router;