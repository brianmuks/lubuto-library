import React, { Fragment,useEffect } from "react";
import M from 'materialize-css'
import { exportLanguages, importLanguages, exportLessons, importLessons, exportTools, importTools } from "./methods";
import Upload from "./Upload";

function Sync(){
    useEffect(()=>{
        M.AutoInit();
        M.updateTextFields();
    })


    return <>

            <div className='row'>
            <SyncTabs />
            </div>
           </>
}



function SyncTabs(){

return (
  <>
    <ul className="tabs tabs-fixed-width tab-demo z-depth-1 cyan">
      <li className="tab">
        <a className="active white-text" href="#lesson-tab">
          Lesson
        </a>
      </li>
      <li className="tab">
        <a className=" white-text" href="#lang-tab">
          Language
        </a>
      </li>
      <li className="tab">
        <a className=" white-text" href="#tool-tab">
          Tool
        </a>
      </li>
      <li className="tab">
        <a className=" white-text" href="#upload-tab">
          Upload
        </a>
      </li>
    </ul>
    <div id="lesson-tab" className="col s12">
      <LessonSync />
    </div>

    <div id="tool-tab" className="col s12">
      <ToolSync />
    </div>

    <div id="lang-tab" className="col s12">
      <LangSync />
    </div>

    <div id="upload-tab" className="col s12">
      <Upload />
    </div>
  </>
);



}


function LangSync(){

    return (
        <div className='col m12 offset-m3'>


            <div className="col">
                <button className="btn" onClick={e => exportLanguages()}>
                    Export Languages
        <i className="material-icons" >save_alt</i>
                </button>
            </div>

            <div className="col">

                <button className="btn" onClick={e => importLanguages()}>
                    import Languages
        <i className="material-icons" >cloud_upload</i>
                </button>
            </div>

            <div className="col">
                <a target="_blank" download="proposed_file_name" href='http://localhost:4000/exports/languages.json'>Download</a>
            </div>
        </div>
    )

}


function LessonSync(){

return (
    <div className='col m12 '>
        <div className="col">
            <button className="btn" onClick={e => exportLessons()}>
                Export Lessons
        <i className="material-icons" >save_alt</i>
             </button>
            </div>

            <div className="col">

            <button className="btn" onClick={e => importLessons()}>
                import Lessons
        <i className="material-icons" >cloud_upload</i>
                </button>
                </div>

                <div className="col">
            <a target="_blank" download="proposed_file_name" href='http://localhost:4000/exports/lessons.json'>Download</a>
                </div>
    </div>
)


}




function ToolSync() {

    return (
        <div className='col m12 offset-m6'>
            <div className="col">
                <button className="btn" onClick={e => exportTools()}>
                    Export Tools
        <i className="material-icons" >save_alt</i>
                </button>
            </div>

            <div className="col">

                <button className="btn" onClick={e => importTools()}>
                    import Tools
        <i className="material-icons" >cloud_upload</i>
                </button>
            </div>

            <div className="col">
                <a target="_blank" download="proposed_file_name" href='http://localhost:4000/exports/tool.json'>Download</a>
            </div>
        </div>
    )


}

export default Sync;