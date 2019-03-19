import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import Tabs from "./Tabs";
import M from 'materialize-css'

function Settings(){

    useEffect(()=>{
        M.AutoInit();
    })


    return <Fragment>
            <NavBar />
            <Tabs />
           </Fragment>
}

export default Settings;