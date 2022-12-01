import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar";
import Footer from "./footer";
import { baseUrl } from "../links";
import {useParams} from "react-router-dom"


function VerifyEmail() {

    let {verifyToken} = useParams();
    useEffect(() => {
        async function fetchData() {
            let response = await axios.get(baseUrl + "/auth/verifyEmail/" + verifyToken);
            console.log(verifyToken);
        }
        fetchData();
      }, []);
    return <>
        <Navbar />
        <div className="container" style={{marginTop:"80px"}}>
            <h1>Your Email has Been Verified</h1>
        </div>
        <Footer />
    </>
}

export default VerifyEmail;