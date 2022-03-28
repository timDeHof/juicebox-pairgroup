const express = require('express');
const {getAllPosts}=require('../db');
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

postsRouter.get('/', async (req, res) => {
    const posts=await getAllPosts();
    res.send({
    posts
  });
});

module.exports = postsRouter;