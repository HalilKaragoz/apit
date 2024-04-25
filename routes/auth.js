const express = require('express');
const { deleteUser, listUsers, login, logout, register } = require('../controllers/auth.js');
const db = require('../db.js');

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", listUsers);
router.delete("/:id", deleteUser);

module.exports = router;
