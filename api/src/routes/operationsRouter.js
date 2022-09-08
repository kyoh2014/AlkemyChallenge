const express = require('express');
const { listController,
    createController,
    searchByIdController,
    deleteController,
    updateController } = require('../controllers/operationsController');
const { validateToken } = require("../middlewares/authValidation");
const { ownershipValidation } = require('../middlewares/ownershipValidation');


const router = express.Router();

router.get("/", listController);

router.post("/", validateToken, createController);

router.get("/:id", searchByIdController)

router.put("/:id", validateToken, ownershipValidation, updateController);

router.delete("/:id", deleteController);

module.exports = router;