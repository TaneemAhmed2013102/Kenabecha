import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    <>
        <form className="form-inline d-flex m-2 py-3">
          <input
            className="form-control mr-sm-2 py-3"
            type="search"
            placeholder="What are you looking for?"
            aria-label="Search"
          ></input>
          <button type="button" className="btn btn-primary px-5">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
    </>
  );
}

export default SearchBar;
