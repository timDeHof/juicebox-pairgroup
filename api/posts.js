const express = require("express");
const { token } = require("morgan");
const { getAllPosts, createPost, updatePost, getPostById } = require("../db");
const { requireUser } = require("./utils");
const postsRouter = express.Router();

postsRouter.use((req, res, next) => {
  console.log("A request is being made to /posts");

  next();
});

postsRouter.get("/", async (req, res) => {
  const posts = await getAllPosts();
  res.send({
    posts,
  });
});

postsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content, tags = "" } = req.body;
  //console.log("req", req);

  const tagArr = tags.trim().split(/\s+/);
  const postData = {};

  // only send the tags if there are some to send
  if (tagArr.length) {
    postData.tags = tagArr;
  }

  try {
    postData.authorId = req.user.id; // changed, was postData.authorId = req.user.authorId;

    postData.title = title;
    postData.content = content;

    const post = await createPost(postData); //changed, was const post = await createPost({postData});
    //console.log("post from createPost:", post);
    res.send({ post });
    // this will create the post and the tags for us
    // if the post comes back, res.send({ post });
    // otherwise, next an appropriate error object
  } catch ({ name, message }) {
    next({ name, message });
  }
});

postsRouter.patch("/:postId", requireUser, async (req, res, next) => {
  // console.log("req.params:", req.params);
  const { postId } = req.params;
  const { title, content, tags } = req.body;

  const updateFields = {};

  if (tags && tags.length > 0) {
    updateFields.tags = tags.trim().split(/\s+/);
  }

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const originalPost = await getPostById(postId);
    //console.log("originalPost:", originalPost);
    if (originalPost.author.id === req.user.id) {
      const updatedPost = await updatePost(postId, updateFields);
      //console.log(updatedPost);
      res.send({ post: updatedPost });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a post that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = postsRouter;
