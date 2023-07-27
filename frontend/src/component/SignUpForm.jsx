import getCookie from "../utils/getCookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

export default function SignUpForm() {
  let navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
    password2: "",
    usernameValidation: "",
    passwordValidation: "",
    password2Validation: "",
    nonFieldErrs: "",
  });

  async function register() {
    const url = "http://localhost:8000/register/";
    const csrftoken = getCookie("csrftoken");
    const data = {
      username: state.username,
      password: state.password,
      password2: state.password2,
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      logUserIn();
    } else {
      response = await response.json();
      setState({
        ...state,
        usernameValidation: response.hasOwnProperty("username")
          ? response.username[0]
          : "",
        passwordValidation: response.hasOwnProperty("password")
          ? response.password[0]
          : "",
        password2Validation: response.hasOwnProperty("password2")
          ? response.password2[0]
          : "",
      });
    }
  }

  async function logUserIn() {
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
      console.log(response);
      window.localStorage.setItem("token", JSON.stringify(response.token));
      window.localStorage.setItem(
        "username",
        JSON.stringify(response.username)
      );
      window.localStorage.setItem("user_id", JSON.stringify(response.user_id));
      navigate("/chat");
    }
  }

  function updateForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div class="login-box" style={{backgroundColor:"black", marginBottom:"-4.5rem", marginLeft:"48rem"}}>
      <h2 style={{ marginBottom: "3rem" }}>Register</h2>
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
        <div class="user-box">
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={state.password2}
            onChange={updateForm}
          />
          <label>Confirm Password</label>
        </div>
        <a type="submit" onClick={register}>
          Submit
        </a>
      </form>
    </div>
  );
}
