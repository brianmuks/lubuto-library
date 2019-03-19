import React, { useContext, useState } from "react";
import  { TOOL_CONFIG_MODAL_ID } from "./config/ToolConfig";
import { Link, Redirect } from "react-router-dom";

function LessonNavBar(){
    return(
        <nav>
            <div className="nav-wrapper grey ">

                <ul id="nav-mobile" className=" right hide-on-med-and-down">
                    <li>
                        <a id={`${TOOL_CONFIG_MODAL_ID}-trigger`} href={`#${TOOL_CONFIG_MODAL_ID}`} className='center waves-effect  waves-light  white-text  modal-trigger'>Settings</a>
                    </li>
                    <li><Link to="collapsible.html">Preview</Link></li>
                    <li><Link to="/dashboard" >Home</Link></li>
                    <li><Link to="/dashboard/language_selector/?n=view_lessons">Lessons</Link></li>
                </ul>
            </div>
        </nav>

            )
}


export default LessonNavBar;