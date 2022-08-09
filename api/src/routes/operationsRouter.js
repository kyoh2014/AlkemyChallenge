const express = require('express');
const { listController,
    createController,
    searchByIdController,
    deleteController,
    updateController } = require('../controllers/operationsController');
const { validateToken } = require("../middlewares/validation");

const router = express.Router();

router.get("/", listController);

router.post("/", validateToken, createController);

router.get("/:id", searchByIdController)

router.patch("/:id", validateToken, updateController);

router.delete("/:id", validateToken, deleteController);

module.exports = router;