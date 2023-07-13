import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const data = location.state?.data;
  const dates = location.state?.dates;
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [isAdmin, setAdmin] = useState("");

  function verify() {
    if (name === "student") {
      if (pass === "student") setAdmin("false");
      else alert("wrong password");
    } else if (name === "admin") {
      if (pass === "admin") setAdmin("true");
      else alert("wrong password");
    } else {
      alert("wrong users");
    }
  }

  return (
    <div className="loginPage">
      <div>
        <label>name </label>
        <input
          placeholder="enter name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br />
        <label>password</label>
        <input
          placeholder="enter password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <br />
        <center>
          <button className="btn1" onClick={verify}>
            submit
          </button>
        </center>

        {isAdmin === "true" ? (
          <Navigate to="/details" state={{ data: data, dates: dates }} />
        ) : (
          ""
        )}
        {isAdmin === "false" ? (
          <Navigate to="/booking" state={{ data: data, dates: dates }} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;
