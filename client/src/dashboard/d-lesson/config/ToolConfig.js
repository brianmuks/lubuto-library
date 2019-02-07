import React, { useEffect, useState, useContext } from "react";
import { initModal } from "../../../utilities/Form";
import { TOOLS_STATE } from '../../d-context';
import SetRightAnsView from "./SetRightAns";



export const TOOL_CONFIG_MODAL_ID = 'tool-congfig-modal';    




function ToolConfig(){
    const { state, dispatch } = useContext(TOOLS_STATE);


    const x = 1;//prevent unsessary reloads or change states

    useEffect(() => {
        initModal('#' + TOOL_CONFIG_MODAL_ID);
    }, [x])

    return(
        <div id={TOOL_CONFIG_MODAL_ID} className="modal bottom-sheet">
            <div className="modal-content">
                <h4>Lesson Settings</h4>


                <SetRightAnsView dispatch={dispatch} staggedTools={state.staggedTools} />


            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>
            </div>
        </div>
    )


}



export default ToolConfig;