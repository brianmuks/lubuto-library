import React, { Fragment,useEffect } from "react";
import NavBar from "../../components/Layout/NavBar";
import M from 'materialize-css'
import Footer from "../../components/Layout/Footer";
import { exportLanguages, importLanguages, exportLessons, importLessons } from "./methods";

function Sync(){
    useEffect(()=>{
        M.AutoInit();
        M.updateTextFields();
    })


    return <>

            <div className='row'>

            <div className='col m12'>

                <button onClick={e => exportLanguages()}>
                    Export Languages
                </button>
                <button onClick={e => importLanguages()}>
                    import Languages
                </button>  
            </div>


            <div className='col m12'>

                <button onClick={e => exportLessons()}>
                    Export lessons
                </button>
                <a target="_blank" download="proposed_file_name" href='http://localhost:4000/exports/lessons.json'>Download</a>

            



                <button onClick={e => importLessons()}>
                    import Lessons
                </button>
            </div>



            </div>



            

           </>
}

export default Sync;