import { React, useState } from "react";
import getCookie from "../utils/getCookie";
import "./login.css";

export default function LoginForm() {
  const [state, setState] = useState({
    username: "",
    password: "",
    usernameValidation: "",
    passwordValidation: "",
    nonFieldErrs: "",
  });

  function updateForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function logUserIn(e) {
    e.preventDefault();
    // Log user in via obtaining DRF auth token
    const url = "http://localhost:8000/api-token-auth/";
    const csrftoken = getCookie("csrftoken");
    const data = { username: state.username, password: state.password };
    let response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });
    response = await response.json();
    console.log(response);
    // If response returned auth token, we're safe to redirect the user
    if ("token" in response) {
      window.localStorage.setItem("token", JSON.stringify(response.token));
      window.localStorage.setItem(
        "username",
        JSON.stringify(response.username)
      );
      window.localStorage.setItem("user_id", JSON.stringify(response.user_id));
      window.open("/", "_self");
    } else {
      // if unable to log in, activate alerts
      setState({
        ...state,
        usernameValidation: response.hasOwnProperty("username")
          ? response.username[0]
          : "",
        passwordValidation: response.hasOwnProperty("password")
          ? response.password[0]
          : "",
        nonFieldErrs: response.hasOwnProperty("non_field_errors")
          ? response.non_field_errors[0]
          : "",
      });
    }
  }

  return (
    <div class="login-box" style={{ marginTop: "19rem", backgroundColor:"black", marginBottom:"0", marginLeft:"48rem"}}>
      <h2 style={{ marginBottom: "3rem" }}>Login</h2>
      <form>
        <div class="user-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={state.username}
            autoFocus={true}
            onChange={updateForm}
          />
          <label>Username</label>
        </div>
        <div class="user-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={updateForm}
          />
          <label>Password</label>
        </div>
        <a type="submit" onClick={logUserIn}>
          Submit
        </a>
      </form>
    </div>
  );
}
