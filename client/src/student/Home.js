import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";
import Login from "../Accounts/Login";
import MainActions from "./MainActions";


function Home(){

    return (
      <div id="app">
        <main>
          <header>
            <NavBar color={"light-blue"} />
          </header>

          <div className='bkg-home-container'>
            <span className="s-home-img"></span>
          </div>

          <div className="row s-home">
            <Login />
            <MainActions />
            <div className="container "></div>
          </div>
        </main>
        <Footer />
      </div>
    );
}



export default Home;