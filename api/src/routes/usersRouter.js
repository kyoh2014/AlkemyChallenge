const express = require('express');
const { listController,
    createController,
    searchByIdController, 
    updateController, 
    deleteController } = require('../controllers/userController')


const router = express.Router();


router.get("/", listController)

router.post("/", createController)

router.get("/:id", searchByIdController)

router.patch("/:id", updateController)

router.delete("/:id", deleteController)
    


module.exports = router;