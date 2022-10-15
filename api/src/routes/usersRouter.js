const express = require('express');
const { listController,
    createController,
    searchByIdController, 
    updateController, 
    deleteController } = require('../controllers/userController');
    const { validateToken } = require("../middlewares/authValidation");
    const { ownershipValidation } = require('../middlewares/ownershipValidation');


const router = express.Router();

// User listing router
router.get("/", validateToken, listController)

// Router creating users
router.post("/", validateToken, createController)

// Router to search for users by id
router.get("/:id", validateToken, ownershipValidation, searchByIdController)

// User upgrade router
router.patch("/:id", validateToken, ownershipValidation, updateController)

// User delete router
router.delete("/:id", validateToken, ownershipValidation, deleteController)

module.exports = router;