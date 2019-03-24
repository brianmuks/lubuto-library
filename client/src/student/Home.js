import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import Login from "../Accounts/Login";
import MainActions from "./MainActions";


function Home(){

    return (
        <>
            <NavBar  color={'light-blue'} /> 
            <span className="s-home-img">
                </span>
            <div className="row s-home">
                <Login />
                <MainActions />
        <div className="container ">
            </div>
            </div>
            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br />
            <Footer />
            </>
        
    )
}



export default Home;