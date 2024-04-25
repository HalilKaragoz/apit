const express = require('express');
const { addPost, deletePost, getPost, getPosts, updatePost, updatePostdort, updatePostiki, updatePostuc } = require('../controllers/posts.js');






const router = express.Router();

router.get("/",getPosts);
router.get("/:id",getPost);
router.post("/",addPost);
router.delete("/:id",deletePost);
router.put("/:id",updatePost);
router.put("/iki/:id",updatePostiki);
router.put("/uc/:id",updatePostuc);
router.put("/dort/:id",updatePostdort);

module.exports = router;