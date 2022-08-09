const express = require('express');
const { balanceController, 
    resumeController} = require('../controllers/balanceController');
const { validateToken } = require("../middlewares/validation");

const router = express.Router();

router.get("/", validateToken, balanceController);
router.get("/resume", validateToken, resumeController);

module.exports = router;