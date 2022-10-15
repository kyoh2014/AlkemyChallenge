const express = require("express");
const users = require("./usersRouter");
const operations = require("./operationsRouter");
const categories = require("./categoriesRouter");
const authentication = require("./authenticationRouter");
const balance = require("./balanceRouter");

const router = express.Router();

// User Router
router.use("/users", users);

// Operation Router
router.use("/operations", operations);

// Categories Router
router.use("/categories", categories);

// Auth Router
router.use("/authentication", authentication);

// Balance Router
router.use("/balance", balance);

module.exports = router;