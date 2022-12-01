import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import AdItem from "./ad_item";
import { baseUrl } from "../links";
import SideBar from "./sideBar";
import {useParams} from "react-router-dom"

function CategoryPage() {

  const {location, category} = useParams();
  const [listOfAds, setListOfAds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.post(baseUrl + '/home/ads', {
        location: location,
        category: category,
      });
      setListOfAds(response["data"]["data"]["details"]["items"]);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div className="row">
          <div className="col-3 border-end border-2">
            <SideBar location = {location} category = {category}/>
          </div>
          <div className="col-9">
            {listOfAds.map((e) => <AdItem ad={e} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
