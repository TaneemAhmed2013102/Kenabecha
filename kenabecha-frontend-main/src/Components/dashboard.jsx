import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import AdItem from "./ad_item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../links";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [details, setDetails] = useState({});
  const userToken = localStorage.getItem("userToken");
  const [listOfAds, setListOfAds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let userToken = localStorage.getItem("userToken");
      console.log(userToken);
      let response = await axios.get(baseUrl + "/user/details", {
        headers: { userToken: userToken },
      });
      setDetails(response["data"]["data"]["details"]);

      response = await axios.get(baseUrl + "/user/ads", {
        headers: { userToken: userToken },
      });
      setListOfAds(response["data"]["data"]["details"]["items"]);
      // console.log(response["data"]);
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userSessionToken");
    setDetails({});
  };

  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div className="row py-3">
          <div className="col-3 border-end border-2 p-4">
            <i className="me-2">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </i>
            <h3 className="d-inline-block">Account</h3>
            <p className="mt-4 mb-1">Name</p>
            <h6>{details.name}</h6>
            <p className="mt-4 mb-1">Email</p>
            <h6>{details.email}</h6>
            <p className="mt-4 mb-1">Total Ads</p>
            <h6>{details.totalRunningAds}</h6>
            <p className="mt-4 mb-1">Total Items Sold</p>
            <h6>{details.soldAds}</h6>
            <div className="d-grid">
              <button
                onClick={(event) => {
                  handleLogout();
                }}
                type="button"
                className="d-block btn btn-danger mt-5"
              >
                Log Out
              </button>
            </div>
          </div>
          <div className="col-9 p-3">
            <h3 className="pb-3">My Ads</h3>
            {listOfAds.map((e) => (
              <AdItem ad={e} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
