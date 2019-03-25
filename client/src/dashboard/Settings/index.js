import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import Tabs from "./Tabs";
import M from 'materialize-css'
import Footer from "../../components/Layout/Footer";

function Settings(){
    useEffect(()=>{
        M.AutoInit();
        M.updateTextFields();
    })


    return <>
        <header>  <NavBar /></header>
            <main>
            <Fragment>
            <Tabs />
           </Fragment>
           </main>
            <Footer />
           </>
}

export default Settings;