const express = require('express');
const { addUser, deleteUser, getPosts } = require('../controllers/users.js');

const router = express.Router();

router.get("/", getPosts);
router.delete("/yazarsil/:id", deleteUser);
router.post("/", addUser);

module.exports = router;
