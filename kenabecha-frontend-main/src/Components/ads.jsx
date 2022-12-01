import React, { useState, useEffect } from 'react'
import axios from "axios";
import { baseUrl } from "../links";

function Ads(props) {
    const [listOfAds, setListOfAds] = useState([]);
    const [location, setLocation] = useState('');

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(baseUrl + '/home/locations');
            let tempList = response["data"]["data"]["details"]["items"];
            setListOfAds(tempList);
            setLocation(localStorage.getItem('location'));
            // console.log('location', location);
        }
        fetchData();
    }, []);

    return(<h1>{props.categoryName}</h1>);
}

export default Ads;