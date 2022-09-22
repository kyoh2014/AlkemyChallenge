const express = require('express');
const { listController,
    createController,
    searchByIdController, 
    updateController, 
    deleteController } = require('../controllers/userController');
    const { validateToken } = require("../middlewares/authValidation");
    const { ownershipValidation } = require('../middlewares/ownershipValidation');


const router = express.Router();


router.get("/", validateToken, listController)

router.post("/", validateToken, createController)

router.get("/:id", validateToken, ownershipValidation, searchByIdController)

router.patch("/:id", validateToken, ownershipValidation, updateController)

router.delete("/:id", validateToken, ownershipValidation, deleteController)
    


module.exports = router;