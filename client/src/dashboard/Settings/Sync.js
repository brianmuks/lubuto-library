import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import M from 'materialize-css'
import Footer from "../../components/Layout/Footer";
import { exportLanguages, importLanguages } from "./methods";

function Sync(){
    useEffect(()=>{
        M.AutoInit();
        M.updateTextFields();
    })


    return <>
       
            <button onClick={e=>exportLanguages()}>
                    Export Languages
                </button>   
            <button onClick={e=>importLanguages()}>
                    import Languages
                </button>   

           </>
}

export default Sync;