import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { baseUrl } from "../links";

function Register() {
  const userToken = localStorage.getItem("userToken");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  if (!!userToken) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    // console.log(`${fullname}*${email}*${password}*${confirmPassword}`);
    e.preventDefault();

    const characterCheck = /[a-zA-Z]/g;
    const digitCheck = /\d/;
    const specialCharCheck = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!fullname) {
      setColor("danger");
      setStatus("Fullname can't be empty");
      return;
    }

    // if (!digitCheck.test(fullname)) {
    //   setColor('danger');
    //   setStatus("Fullname can't contain digit");
    //   return;
    // }

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

    if (password.length < 8) {
      setColor("danger");
      setStatus("Password must contain at least 8 characters");
      return;
    }

    if (!digitCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 digit");
      return;
    }

    if (!characterCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 character");
      return;
    }

    if (!specialCharCheck.test(password)) {
      setColor("danger");
      setStatus("Password must contain at least 1 special character");
      return;
    }

    if (!confirmPassword || password !== confirmPassword) {
      setColor("danger");
      setStatus("Password did not match");
      return;
    }

    if (!validateEmail()) {
      setColor("danger");
      setStatus("Invalid email");
      return;
    }

    let response = await axios.post(baseUrl + "/auth/register", {
      fullname: fullname,
      email: email,
      password: password,
    });

    // console.log(response.data);
    if (response.data.error.errorCode) {
      setColor("danger");
      setStatus(response.data.error.errorDetails);
    } else {
      setColor("success");
      setStatus(response.data.data.details);
    }
  };

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <>
      <Navbar />
      <div
        className="p-5 container shadow-sm rounded"
        style={{ backgroundColor: "#e9ecef", marginTop: "5rem" }}
      >
        <div>
          <h1 className="text-center pb-3">Register</h1>
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
                    type="text"
                    value={fullname}
                    onInput={(e) => setFullname(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="fullNameInput"
                    placeholder="Full Name"
                  ></input>
                  <label for="fullNameInput">Full Name</label>
                </div>
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
                <div className="form-floating">
                  <input
                    type="password"
                    value={confirmPassword}
                    onInput={(e) => setConfirmPassword(e.target.value)}
                    onChange={(e) => setStatus("")}
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Confirm Password"
                  ></input>
                  <label for="confirmPasswordInput">Confirm Password</label>
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
                    Register
                  </button>
                </div>
                {/* NEED TO EDIT */}
                <p className="mt-4 text-center">
                  Already have an account?{" "}
                  <a href="/login" className="text-decoration-none">
                    <strong className="text-success">Log in</strong>
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

export default Register;
