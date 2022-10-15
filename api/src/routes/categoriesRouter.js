const express = require('express');
const { listController,
    createController,
    searchByIdController,
    updateController,
    deleteController } = require('../controllers/categoriesController');

const router = express.Router();

// Category listing router for user operations
router.get("/", listController);

// Router creating categories for user operations
router.post("/", createController);

// Router to search for categories by id
router.get("/:id", searchByIdController)

// Category upgrade router
router.patch("/:id", updateController)

// Category delete router
router.delete("/:id", deleteController)

module.exports = router;