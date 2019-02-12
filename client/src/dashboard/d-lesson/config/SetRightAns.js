import React, { useEffect, useState, useContext } from "react";
import { TOOLS_STATE } from "../../d-context";
import { editStaggedTools } from "../../d-redux/actions/lessonActions";

function SetRightAnsView({ staggedTools, dispatch}){

    // const { state, dispatch } = useContext(TOOLS_STATE);
    const [rightAnsId, setRightAns] = useState('');
    const [questionId, setRightQuestion] = useState('');

    const set = () => {

        /**
         * 
         * NOTE: that attributes are overwritten because we don't want to have one
         tool being a question and answer at the sametime
         * 
         * 
         *  */

        let tools = staggedTools.map(i => (
            i._id == rightAnsId && { ...i, isAns: true, questionId, isQuestion: false, rightAnsId:undefined} 
            || i._id == questionId && { ...i, isQuestion: true, rightAnsId, isAns: false, questionId:undefined } || i
        ))
        rightAnsId && questionId && dispatch(editStaggedTools(tools));
        setRightAns('');
        setRightQuestion('');
    }         

        return(
            <div className="row">
            <div className="input-field col s12 m6">
                <h5 className='center'>Questions</h5>
                    <select value={questionId} onChange={e =>setRightQuestion(e.target.value)} className="browser-default ">
                    <option value="" disabled >Choose A Question</option>
                        <RenderQuestionOptions staggedTools={staggedTools} />
                </select>
            </div>
            <div className="input-field col s12 m6">
                  <h5 className='center'>Answers</h5>
                    <select value={rightAnsId} onChange={e => setRightAns(e.target.value)} className="icons browser-default">
                    <option value="" disabled >Match An Answer</option>
                        <RenderAnswerOptions staggedTools={staggedTools} />
                </select>

            </div>
                <button onClick={set} className='btn teal center col s6 offset-s3'> Set </button>
            </div>
        )
}

function RenderQuestionOptions({ staggedTools}){
    return staggedTools.map((item,index)=>(
            <option key={index} value={item._id} data-icon="images/sample-1.jpg">{item.label}</option>
        ))
}

function RenderAnswerOptions({ staggedTools }) {
    return staggedTools.map((item, index) => (
        <option key={index} value={item._id} data-icon="images/sample-1.jpg">{item.label}</option>
    ))
}

export default SetRightAnsView;