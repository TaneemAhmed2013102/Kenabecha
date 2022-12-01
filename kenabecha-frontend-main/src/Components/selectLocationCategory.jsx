import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import PostAd from "./postAd";
import { Navigate } from "react-router-dom";
import { baseUrl } from "../links";

function SelectLocationCategory() {
  const userToken = localStorage.getItem("userToken");
  const [listOfLocations, setListOfLocations] = useState([]);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [locationDisplay, setLocationDisplay] = useState("d-none");
  const [category, setCategory] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/home/locations");
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfLocations(tempList);

      response = await axios.get(baseUrl + "/home/categories");
      tempList = response["data"]["data"]["details"]["items"];
      setListOfCategories(tempList);
    }
    fetchData();
  }, []);

  const onCategoryClick = (e) => {
    //e.preventDefault();
    setCategory((old) => ({
      ...old,
      ...e,
    }));
    setLocationDisplay("d-block");
  };

  const onLocationClick = (e) => {
    //e.preventDefault();
    setLocation((old) => ({
      ...old,
      ...e,
    }));
  };

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  if (location && Object.keys(location).length != 0) {
    return <PostAd location={location} category={category} />;
  }

  return (
    <>
      <Navbar />
      <div className="container bg-light rounded" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-6 mt-3">
            <h4>Select a Catagory</h4>
            <ul className="list-group list-group-flush my-3">
              {listOfCategories.map((e) => (
                <li
                  key={e.token}
                  className="list-group-item p-3 rounded"
                  onClick={(i) => {
                    onCategoryClick({
                      slug: e.slug,
                      title: e.title,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
          <div className={`col-6 ${locationDisplay} mt-3`}>
            <h4>Select a Location</h4>
            <ul className="list-group list-group-flush my-3">
              {listOfLocations.map((e) => (
                <li
                  key={e.token}
                  className="list-group-item p-3 rounded"
                  onClick={(i) => {
                    onLocationClick({
                      slug: e.slug,
                      title: e.title,
                    });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {e.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelectLocationCategory;
