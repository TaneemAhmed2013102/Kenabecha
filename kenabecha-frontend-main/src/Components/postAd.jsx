import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTag } from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../links";
import {Navigate} from "react-router-dom";

function PostAd(props) {
  let userToken = localStorage.getItem("userToken");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("danger");
  const [conditionRadioButton, setConditionRadioButton] = useState(false);
  const [negotiableButton, setNegotiableButton] = useState(false);
  const [details, setDetails] = useState({});
  const [image, setImage] = useState('');
  const [adPosted, setAdPosted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(baseUrl + "/user/details", {
        headers: { userToken: userToken },
      });
      setDetails(response["data"]["data"]["details"]);
      // console.log(response["data"]);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setColor("danger");
      setStatus("Title can't be empty");
      return;
    }

    if (!description) {
      setColor("danger");
      setStatus("Description can't be empty");
      return;
    }

    if (!price) {
      setColor("danger");
      setStatus("Price can't be empty");
      return;
    }

    if (!image) {
      setColor("danger");
      setStatus("Your must upload an image");
      return;
    }

    if (!phoneNumber) {
      setColor("danger");
      setStatus("Phone Number can't be empty");
      return;
    }

    if (phoneNumber.length != 11) {
      setColor("danger");
      setStatus("Phone Number must be of 11 digits");
      return;
    }

    if (isNaN(phoneNumber)) {
      setColor("danger");
      setStatus("Phone Number must only contain digits");
      return;
    }

    if (phoneNumber.substring(0, 2) != "01") {
      setColor("danger");
      setStatus("Phone Number must start with 01");
      return;
    }

    if (conditionRadioButton == false) {
      setColor("danger");
      setStatus("Your must agree to the terms and conditions");
      return;
    }

    let body = {
      title: title,
      description: description,
      price: price,
      isNegotiable: negotiableButton,
      phoneNumber: phoneNumber,
      image: image,
      categorySlug: props.category.slug,
      locationSlug: props.location.slug,
    }
    let response = await axios.post(baseUrl + "/user/ads/new", body,{
      headers: { userToken: userToken },
    });
    console.log(body);
    if (response.data.error.errorCode) {
      setColor("danger");
      setStatus(response.data.error.errorDetails);
    } else {
      setAdPosted(true);
    }

  };

  if (adPosted) {
    return <Navigate to="/" replace />;
  }

  const handleImageUpload = async (event) => {
    setStatus("");
    const base64image = await convertBase64(event.target.files[0]);
    // console.log(base64image);
    setImage(base64image);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "80px" }}>
        <div class="d-flex pt-3">
          <div class="me-auto p-2">
            <h5>Fill in the details</h5>
          </div>
          <div class="p-2">
            <i className="m-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </i>
            <h6 className="d-inline-block me-3">{props.location.title}</h6>
            <i className="m-2">
              <FontAwesomeIcon icon={faTag} />
            </i>
            <h6 className="d-inline-block me-5">{props.category.title}</h6>
          </div>
        </div>
        <hr></hr>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="row mt-5">
            <div className="col-6 mx-auto">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  value={title}
                  onInput={(e) => setTitle(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  id="titleInput"
                  placeholder="Title"
                ></input>
                <label for="titleInput">Title</label>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  value={description}
                  onInput={(e) => setDescription(e.target.value)}
                  onChange={(e) => setStatus("")}
                  className="form-control"
                  placeholder="Description"
                  id="descriptionInput"
                  style={{ height: "300px" }}
                ></textarea>
                <label for="descriptionInput">Description</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="number"
                  value={price}
                  onInput={(e) => setPrice(e.target.value)}
                  onChange={(e) => setStatus("")}
                  class="form-control"
                  id="priceInput"
                  placeholder="Price(Tk)"
                ></input>
                <label for="priceInput">Price(Tk)</label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={negotiableButton}
                  id="negotiableInput"
                  onChange={(e) => setNegotiableButton(e.target.checked)}
                ></input>
                <label class="form-check-label" for="negotiableInput">
                  Negotiable
                </label>
              </div>
              <hr></hr>
              <h5>Add a photo</h5>
              <div>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleImageUpload}
                  class="form-control mb-2"
                ></input>
              </div>
              <hr></hr>
              <h5>Contact Details</h5>
              <p className="mt-4 mb-1">Name</p>
              <h6>{details.name}</h6>
              <p className="mt-4 mb-1">Email</p>
              <h6>{details.email}</h6>
              <div class="form-floating mb-5 mt-5">
                <input
                  type="text"
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.target.value)}
                  onChange={(e) => setStatus("")}
                  class="form-control"
                  id="phoneNumberInput"
                  placeholder="Phone Number"
                ></input>
                <label for="phoneNumberInput">Phone Number</label>
              </div>
              <div class="form-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value={conditionRadioButton}
                  onChange={(e) => {
                    setStatus("");
                    setConditionRadioButton(e.target.checked);
                  }}
                  id="termsAndConditionsInput"
                ></input>
                <label class="form-check-label" for="termsAndConditionsInput">
                  I have read and accept the Terms and Conditions
                </label>
              </div>
              <div className="d-flex justify-content-between">
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
                  Post Ad
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default PostAd;
