const express = require('express');
const { listController,
    createController,
    searchByIdController, 
    updateController, 
    deleteController } = require('../controllers/userController');
    const { validateToken } = require("../middlewares/authValidation");


const router = express.Router();


router.get("/", validateToken, listController)

router.post("/", validateToken, createController)

router.get("/:id", validateToken, searchByIdController)

router.patch("/:id", validateToken, updateController)

router.delete("/:id", validateToken, deleteController)
    


module.exports = router;