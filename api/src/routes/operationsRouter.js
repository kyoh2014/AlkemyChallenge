const express = require('express');
const { listController,
    createController,
    searchByIdController,
    deleteController,
    updateController } = require('../controllers/operationsController');
const { validateToken } = require("../middlewares/authValidation");
const { ownershipValidation } = require('../middlewares/ownershipValidation');


const router = express.Router();

// Operation listing router for the user
router.get("/", validateToken, listController);

// Router creating operations for the user
router.post("/", validateToken, createController);

// Router to search for operations by id
router.get("/:id", validateToken, ownershipValidation, searchByIdController);

// Operation upgrade router
router.put("/:id", validateToken, ownershipValidation, updateController);

// Operation delete router
router.delete("/:id", validateToken, ownershipValidation, deleteController);


module.exports = router;