import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTag } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../links";

function SideBar(props) {
  const [listOfLocations, setListOfLocations] = useState([]);
  const [listOfCatagories, setListOfCatagories] = useState([]);
  let location = props.location;
  let category = props.category;


  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/home/locations");
      console.log(response);
      let tempList = response["data"]["data"]["details"]["items"];
      setListOfLocations(tempList);
      response = await axios.get(baseUrl + "/home/categories");
      tempList = response["data"]["data"]["details"]["items"];
      setListOfCatagories(tempList);
    }
    fetchData();
  }, []);

  // if (location && location !== urlParams.location) {
  //   return <Navigate to={`/ads/${location}/${category}`} replace />;
  // }

  // if (category && category !== urlParams.category) {
  //   return <Navigate to={`/ads/${location}/${category}`} replace />;
  // }

  return (
    <>
            <div className="d-block">
              <i className="m-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </i>
              <h6 className="d-inline-block me-3 mb-3">Select Location</h6>
            </div>
            <div className="d-inline">
              {listOfLocations.map((e) => (
                <button onClick={(event) => {
                  if (e.slug !== props.location) {
                    location = e.slug;
                  } else {
                    location = "all"; 
                  }
                  window.location.href = `/ads/${location}/${category}`;
                }} type="button" className={"btn btn-outline-success ms-2 mb-2 " + ((e.slug == props.location) ? "active" : "")}>
                  {e.title}
                </button>
              ))}
            </div>
            <div className="d-block mt-4">
              <i className="m-2">
                <FontAwesomeIcon icon={faTag} />
              </i>
              <h6 className="d-inline-block me-3 mb-3">Select Categories</h6>
            </div>
            <ul class="list-group list-group-flush mb-3">
              {listOfCatagories.map((e) => (
                <li
                  key={e.token}
                  onClick={(event) => {
                    if (e.slug !== props.category) {
                      category = e.slug;
                    } else {
                      category = "all"; 
                    }
                    window.location.href = `/ads/${location}/${category}`;
                  }}
                  className={"list-group-item p-3 rounded " + ((e.slug == props.category) ? "list-group-item-success" : "bg-light")}
                  style={{ cursor: "pointer"}}
                >
                  {e.title}
                </li>
              ))}
            </ul>
    </>
  );
}

export default SideBar;