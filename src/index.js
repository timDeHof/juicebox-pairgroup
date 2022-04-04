import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Main } from "./components";

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById("app")
);
