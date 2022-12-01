import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { baseUrl } from "../links";

function Footer() {
  const [listOfLocations, setListOfLocations] = useState([]);
  const [listOfCategories, setListOfCategories] = useState([]);

  useEffect(() => {
      async function fetchData() {
          let response = await axios.get(baseUrl + '/home/locations/popular');
          let tempList = response["data"]["data"]["details"]["items"];
          setListOfLocations(tempList);

          response = await axios.get(baseUrl + '/home/categories/popular');
          tempList = response["data"]["data"]["details"]["items"];
          setListOfCategories(tempList);
          // console.log('location', location);
      }
      fetchData();
  }, []);

  return (
    <footer className="bd-footer py-5 mt-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <a className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/" aria-label="Bootstrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2" viewBox="0 0 118 94" role="img"><title>BechaKena</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
              <span className="fs-5">BechaKena</span>
            </a>
            <ul className="list-unstyled small text-muted">
              <li className="mb-2">Designed and built with all the love in the world by the <a href="/docs/5.0/about/team/" style={{color: "#495057", textDecoration: "none"}}>Moga Team</a>.</li>
              <li className="mb-2">Copyright © 2022 BechaKena.shop</li>
            </ul>
          </div>
          <div className="col-6 col-lg-3 offset-lg-1 mb-3">
            <h5>Popular Locations</h5>
            <ul className="list-unstyled">
              { listOfLocations.map(e => <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="/">{e.title}</a></li>) }
            </ul>
          </div>
          <div className="col-6 col-lg-3 mb-3">
            <h5>Popular Categories</h5>
            <ul className="list-unstyled">
              { listOfCategories.map(e => <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="/">{e.title}</a></li>) }
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex">
                          
              
              
              
              <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="https://github.com/twbs/bootstrap/issues">
                <i className="me-3">
                  <FontAwesomeIcon icon={faFacebook} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="https://github.com/twbs/bootstrap/issues">
                <i className="me-3">
                  <FontAwesomeIcon icon={faInstagram} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="https://github.com/twbs/bootstrap/issues">
                <i className="me-3">
                  <FontAwesomeIcon icon={faTwitter} />
                </i>
              </a></li>
              <li className="mb-2"><a style={{color: "#495057", textDecoration: "none"}} href="https://github.com/twbs/bootstrap/issues">
                <i className="me-3">
                  <FontAwesomeIcon icon={faLinkedin} />
                </i>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
  
}

export default Footer;
