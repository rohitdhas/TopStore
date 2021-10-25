const express = require("express");
const router = express.Router();
const { getUserData, createNewAccount, checkAuthenticated, logout, login } = require('../Controller/UserController');

router.post("/login", login);

router.get("/logout", logout);

router.get("/isAuthenticated", checkAuthenticated);

router.post("/user/create", createNewAccount);

router.get("/data", getUserData);

module.exports = router;
