import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import M from 'materialize-css'
import Footer from "../../components/Layout/Footer";
import { exportLanguages } from "./methods";

function Sync(){
    useEffect(()=>{
        M.AutoInit();
        M.updateTextFields();
    })


    return <>
       
            <button onClick={e=>exportLanguages()}>
                    Export Language
                </button>   

           </>
}

export default Sync;