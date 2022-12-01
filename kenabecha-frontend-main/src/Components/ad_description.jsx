import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSquareAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, imageUrl } from "../links";
import { Navigate } from "react-router-dom";

function AdDescription(props) {
  let userToken = localStorage.getItem("userToken");
  let { adToken } = useParams();
  const [details, setDetails] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    //console.log(adToken);
    async function fetchData() {
      let response = await axios.get(baseUrl + `/home/ads/details/` + adToken);
      //console.log(response["data"]["data"]["details"]);
      setDetails(response["data"]["data"]["details"]);
    }
    fetchData();
  }, []);

  const handleMarkAsSold = async () => {
    let response = await axios.get(baseUrl + "/user/mark/sold/" + adToken, {
      headers: { userToken: userToken },
    });

    if (response.data.error.errorCode) {
    } else {
      setButtonClicked(true);
    }
  };

  if (buttonClicked) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div className="d-flex pt-3">
          <div className="me-auto p-2">
            <h3 className="d-inline">{details.title}</h3>
            <div className="text-muted mt-2">Posted on {details.createdAt}</div>
          </div>
        </div>
        <div className="row mt-3 p-2">
          <div className="col-9">
            <img src={imageUrl + details.image} width="100%"></img>
            <div className="text-muted py-4">
              <h4 className="text-success  d-inline">Tk {details.price}</h4>
              <p className="d-inline ms-3 ">
                {details.isNegotiable ? "(Negotiable)" : ""}
              </p>
            </div>
            <div>
              <h6>Description</h6>
              <p>{details.description}</p>
            </div>
          </div>
          <div className="col-3">
            <div className="border p-3">
              <h4>Seller Details</h4>
              <p className="mt-4 mb-1">Name</p>
              <h6>{details.name}</h6>
              <p className="mt-4 mb-1">Email</p>
              <h6>{details.email}</h6>
            </div>
            <div className="border p-3">
              <i>
                <FontAwesomeIcon icon={faPhoneSquareAlt} size="lg" />
              </i>
              <h5 className="d-inline-block ms-2">{details.phoneNumber}</h5>
            </div>
            <div className="border p-3">
              <i>
                <FontAwesomeIcon icon={faUserShield} size="lg" />
              </i>
              <h5 className="d-inline-block ms-2">Safety Tips</h5>
              <ul className="mt-2">
                <li>Avoid offers that look unrealistic</li>
                <li>Contact seller to clarify item</li>
                <li>Meet in a safe and public place</li>
                <li>Check the item before buying it</li>
                <li>Don’t pay in advance</li>
              </ul>
            </div>
            <div className="d-grid">
              <button
                onClick={(event) => {
                  handleMarkAsSold();
                }}
                type="button"
                className={
                  "btn btn-success mt-5 d-block " +
                  (userToken && userToken == details.createdBy ? "" : "d-none")
                }
              >
                Mark as sold
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdDescription;
