import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Posts from "./Posts";
import { Route } from "express";
import apiRouter from "../api";
import { getAllPosts } from "../../db";
import { response } from "express";
const Main = (props) => {
  const [posts,setPosts]=userState([]);
  useEffect(() => {
    const fetchPost=async()=>{
      const response =await getAllPosts;
    }
    const data=await response.json();
    setPosts(data.data.posts);
  }, []);
  
  return (
    <div className="MainClass">
      <Navbar />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
      </Switch>
    </div>
  );
};
export default Main;
