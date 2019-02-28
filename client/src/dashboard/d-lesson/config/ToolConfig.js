import React, { useEffect, useState, useContext } from "react";
import { initModal } from "../../../utilities/Form";
import { TOOLS_STATE } from '../../d-context';
import SetRightAnsView from "./SetRightAns";
import SetLessonNo from "./SetLessonNo";
import { setLessonNumber } from "../../d-redux/actions/lessonActions";
import { getUrlParam } from "../../../utilities/Tasks";
import { LESSON_TYPES } from "../../d-redux/constants";
import SetSpeakerIntruction from "./SetSpeakerIntruction";


export const TOOL_CONFIG_MODAL_ID = 'tool-congfig-modal';    

function ToolConfig(){
    const { state, dispatch } = useContext(TOOLS_STATE);
    // const [lessonNumber, setLessonNumber] = useState(null);

    const _setLessonNumber = e => {
        const lessonNumber = e.target.value;
        // setLessonNumber(lessonNumber);
        // const tools = [ ...state.staggedTools,{meta:{...state.staggedTools.meta,lessonNumber}}]
        // const meta =  { ...state.staggedTools.meta, lessonNumber } ;
        dispatch(setLessonNumber(lessonNumber));
    }

    const x = 1;//prevent unsessary reloads or change states

    useEffect(() => {
        initModal('#' + TOOL_CONFIG_MODAL_ID);
    }, [x])

    const isExeLesson = getUrlParam('type') === 'instr';

    return(
        <div id={TOOL_CONFIG_MODAL_ID} className="modal bottom-sheet  ">
           
            <div className="col">
                <h4>Lesson Settings  </h4>
                <h6 className="teal-text  ">  {LESSON_TYPES[getUrlParam('type')]} </h6>
                </div>

            <SetSpeakerIntruction /> 


            <div className="modal-content">
          
                 <SetLessonNo lessonNumber={state.meta.lessonNumber}  _setLessonNumber={_setLessonNumber} />
                <SetRightAnsView isExeLesson={isExeLesson} dispatch={dispatch} staggedTools={state.staggedTools} />
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">Done</a>
            </div>
        </div>
    )

}

export default ToolConfig;