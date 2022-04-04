import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import LoginUser from "./LoginUser";
import SignupUsers from "./SignupUsers";

function Main() {
  const [userObj, setUserObj] = useState({});
  const [token, setToken] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, [token]);

  return (
    <div className="web-page">
      <Switch>
        <Route path="/signup">
          <SignupUsers setToken={setToken} />
        </Route>
        <Route path="/login">
          <LoginUser setToken={setToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
