import React, { useState } from "react";
import { createPost } from "../db";

const CreatePostForm = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  return <div></div>;
};

export default CreatePostForm;
