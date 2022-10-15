const express = require('express');
const { signInController,
    signUpController, 
    authController } = require('../controllers/authenticationController')
const { validateToken } = require("../middlewares/authValidation")

const router = express.Router();

// User Login Router
router.post('/signIn', signInController)

// User Register Router
router.post('/signUp', signUpController)

// User Authentication Router
router.get('/', validateToken, authController)

module.exports = router;