import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import Login from "../Accounts/Login";




function Home(){

    return (
        <>
        
            <NavBar  color={'light-blue'} /> 

            <span className="s-home-img">

                </span>


            <div className="row s-home">
                <Login />
           
        
        <div className="container ">

            </div>
            </div>
    
            <Footer />

            </>
        
    )

}



export default Home;