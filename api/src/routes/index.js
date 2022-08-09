const express = require("express");
const users = require("./usersRouter");
const operations = require("./operationsRouter");
const categories = require("./categoriesRouter");
const authentication = require("./authenticationRouter");
const balance = require("./balanceRouter");

const router = express.Router();


router.use("/users", users);
router.use("/operations", operations);
router.use("/categories", categories);
router.use("/authentication", authentication);
router.use("/balance", balance);


module.exports = router;