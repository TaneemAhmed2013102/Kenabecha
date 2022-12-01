import React, { useState } from "react";
import { imageUrl } from "../links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTag } from "@fortawesome/free-solid-svg-icons";

function AdItem(props) {
   console.log(props);
  return (
    <>
    <a href={((props.ad.sold == "No") ? `/details/${props.ad.token}` : '#')} className="text-decoration-none">
      <div className={"card mb-3 " + ((props.ad.sold == "No") ? "" : "opacity-25")} >
        <div className="row g-0">
          <div className="col-4 border-end border-2">
            <div className="d-flex justify-content-center">
              <img
                src={imageUrl + props.ad.image}
                className="img-fluid rounded-start"
                alt="..."
                style={{ maxHeight: "180px" }}
              />
            </div>
          </div>
          <div className="col-8">
            <div className="card-body pb-1">
              <h3 className="card-title text-dark">{props.ad.title}</h3>
              <div className="d-flex">
                <p className="card-text me-3">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    {props.ad.locationSlug}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <FontAwesomeIcon icon={faTag} /> {props.ad.categorySlug}
                  </small>
                </p>
              </div>
              <p className="card-text text-success fw-bold">
                Tk {props.ad.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
    </>
  );
}

export default AdItem;
