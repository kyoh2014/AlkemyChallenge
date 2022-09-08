const express = require('express');
const { balanceController, 
    resumeController,
    allResumeController} = require('../controllers/balanceController');
const { validateToken } = require("../middlewares/authValidation")

const router = express.Router();

router.get("/", validateToken, balanceController);
router.get("/resume", validateToken, resumeController);
router.get("/allresume", validateToken, allResumeController );


module.exports = router;