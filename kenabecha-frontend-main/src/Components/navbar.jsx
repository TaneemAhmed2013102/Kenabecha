import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../links";

function Navbar() {
  const [listOfLocations, setListOfLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [myAccount, setMyAccount] = useState("");
  const [login, setLogin] = useState("");

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/home/locations");
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfLocations(tempList);
      setLocation(localStorage.getItem("location") ?? "all");
      let userToken = localStorage.getItem("userToken");
      if (userToken){
          setMyAccount("");
          setLogin("d-none");
      } else {
        setMyAccount("d-none");
        setLogin("");
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    localStorage.setItem("location", e.target.value);
    setLocation(e.target.value);
    console.log(e.target.value);
  };

  return (
    <nav className="navbar fixed-top navbar-expand navbar-dark bg-success">
      <div className="container">
        <a className="navbar-brand" href="/">
          BechaKena
        </a>
        <ul className="navbar-nav me-auto mb-lg-0">
          <li className="nav-item me-1">
            <a href={`/ads/all/all`}>
              <button className="btn btn-success btn-sm">All Ads</button>
            </a>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <div className="nav-item me-3">
            <a className={"text-white text-decoration-none " + myAccount} href="/dashboard">
              My Account
            </a>
          </div>
          <div className="nav-item me-3">
            <a className={"text-white text-decoration-none " + login} href="/login">
              Login
            </a>
          </div>
          <a href="/post/new">
            <button className="btn btn-lg btn-warning">Post Your Ad</button>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
