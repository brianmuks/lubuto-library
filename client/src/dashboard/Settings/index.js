import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import Tabs from "./Tabs";
import M from 'materialize-css'
import Footer from "../../components/Layout/Footer";

function Settings(){
    useEffect(()=>{
        M.AutoInit();
    })


    return <Fragment>
            <NavBar />
            <Tabs />
            <Footer />
           </Fragment>
}

export default Settings;