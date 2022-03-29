const express = require("express");
const { token } = require("morgan");
const { getAllPosts, createPost } = require("../db");
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
    //postData.authorId = 1;
    postData.title = title;
    postData.content = content;
    //console.log("Postdata:", postData);

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

module.exports = postsRouter;
