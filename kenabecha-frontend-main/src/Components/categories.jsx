import React, { useState, useEffect } from 'react'
import axios from "axios";
import { baseUrl } from "../links";

function Categories() {
    const [listOfCategories, setListOfCategories] = useState([]);
    const [location, setLocation] = useState('');

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(baseUrl + '/home/categories');
            let tempList = response["data"]["data"]["details"]["items"];
            setListOfCategories(tempList);
            setLocation(localStorage.getItem('location'));
            // console.log('location', location);
        }
        fetchData();
    }, []);

    return(
        <div className="row">
            { listOfCategories.map((e) => {
                return (<div className="col-sm-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{e.title}</h5>
                        <p className="card-text">{e.adsCount ?? 0} Products</p>
                        <div className="d-flex">
                            <a href={`/ads/all/${e.slug}`} className="btn btn btn-outline-success btn-sm ms-auto">View Products</a>
                        </div>
                    </div>
                </div>
            </div>)
            }) }
        </div>
    );
}

export default Categories;