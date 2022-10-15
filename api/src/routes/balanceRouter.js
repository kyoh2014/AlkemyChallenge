const express = require('express');
const { balanceController, 
    resumeController,
    allResumeController} = require('../controllers/balanceController');
const { validateToken } = require("../middlewares/authValidation")

const router = express.Router();

// User Balance Router
router.get("/", validateToken, balanceController);

// Log path of last 10 user transactions
router.get("/resume", validateToken, resumeController);

// Log path of all user transactions (with filter)
router.get("/allresume", validateToken, allResumeController );

module.exports = router;