import React, { useState, useEffect } from 'react'
import Navbar from "./navbar";
import Categories from "./categories";
import Footer from "./footer";


function Home() {
    return <>
        <Navbar />
        <div className="container" style={{marginTop:"80px"}}>
            <h6 class="font-weight-bold mb-4">Browse products by category</h6>
            <Categories />
        </div>
        <Footer />
    </>
}

export default Home;