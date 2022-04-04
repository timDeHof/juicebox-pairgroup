import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="NavbarTitle">
        <h1>Juicebox</h1>
      </div>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </div>
  );
};

export default Navbar;
