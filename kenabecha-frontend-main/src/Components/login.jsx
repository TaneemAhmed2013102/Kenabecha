import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { baseUrl } from "../links";

function Login() {
  const userToken = localStorage.getItem("userToken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("danger");
  const [loggedIn, setLoggedIn] = useState(false);

  if (userToken) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setColor("danger");
      setStatus("Email can't be empty");
      return;
    }

    if (!password) {
      setColor("danger");
      setStatus("Password can't be empty");
      return;
    }
    console.log("HI");
    let response = await axios.post(baseUrl + "/auth/login", {
      email: email,
      password: password,
    });

    console.log(response);
    if (response.data.error.errorCode) {
      setColor("danger");
      setStatus(response.data.error.errorDetails);
    } else {
      setLoggedIn(true);
      localStorage.setItem("userToken", response.data.data.userToken);
      localStorage.setItem(
        "userSessionToken",
        response.data.data.userSessionToken
      );
    }
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div
        className="p-5 container shadow-sm rounded"
        style={{ backgroundColor: "#e9ecef", marginTop: "5rem" }}
      >
        <div>
          <h1 className="text-center pb-3">Login</h1>
          <div className="d-flex p-2 h-100 align-items-center">
            <img
              src={require("../Photos/LoginPage.jpg")}
              alt="Shopping Bag"
              width={"45%"}
              height={"45%"}
            ></img>
            <form onSubmit={handleSubmit} className="w-100">
              <div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="emailInput"
                    placeholder="Email Address"
                  ></input>
                  <label for="emailInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password"
                  ></input>
                  <label for="passwordInput">Password</label>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div
                    className={!status ? "d-none" : "alert alert-" + color}
                    role="alert"
                  >
                    {status}
                  </div>
                  <button
                    type="submit"
                    className="ms-auto btn-lg mb-3 btn-success"
                  >
                    Login
                  </button>
                </div>
                <p className="mt-4 text-center">
                  Don't have an account?{" "}
                  <a href="/register" className="text-decoration-none">
                    <strong className="text-success">Register</strong>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
