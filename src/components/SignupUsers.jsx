import React, { useState } from "react";
import { createUser } from "../../db";
function SignupUsers({ setToken }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="signUpUsers">
      <form
        className="form"
        onSubmit={async (ev) => {
          ev.preventDefault();

          const result = await createUser(userName, password, name, location);

          localStorage.setItem("token", result.token);
          setToken(result.data.token);
        }}
      >
        <input
          type="text"
          value={name}
          placeholder="First Name"
          onChange={(ev) => {
            setName(ev.target.value);
          }}
        />
        <input
          type="text"
          value={location}
          placeholder="location"
          onChange={(ev) => {
            setLocation(ev.target.value);
          }}
        />
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={(ev) => {
            setUserName(ev.target.value);
          }}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupUsers;
