import {Route} from "express";
import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import {Main} from "./components";
import "./index.css";

const App = () => {
    return (
        <div className="app">
            <Main/>
        </div>
    );
};
ReactDom.render (
    <Router>
        <App/>
    </Router>,
    document.getElementById("app")
);
