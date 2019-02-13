import React, { useEffect, useState, useContext } from "react";
import { TOOLS_STATE } from "../../d-context";
import { editStaggedTools } from "../../d-redux/actions/lessonActions";

function SetRightAnsView({ staggedTools, dispatch}){

    // const { state, dispatch } = useContext(TOOLS_STATE);
    const [rightAnsIndex, setRightAns] = useState('');
    const [questionIndex, setRightQuestion] = useState('');

    const set = () => {

        /**
         * 
         * NOTE:  attributes are overwritten because we don't want to have one
         tool being a question and answer at the sametime
         * 
         * 
         *  */

        let tools = staggedTools.map(i => (
            i.index == rightAnsIndex && { ...i, isAns: true, questionIndex, isQuestion: false, rightAnsIndexs:undefined} 
            || i.index == questionIndex && { ...i, isQuestion: true, rightAnsIndexs: i.rightAnsIndexs && [...i.rightAnsIndexs,rightAnsIndex] || [rightAnsIndex], isAns: false, questionIndex:undefined } || i
        ))
        rightAnsIndex && questionIndex && dispatch(editStaggedTools(tools));
        M.toast({ html: `Done` })
        setRightAns('');
        setRightQuestion('');
    }         

        return(
            <div className="row">
            <div className="input-field col s12 m6">
                <h5 className='center'>Questions</h5>
                    <select value={questionIndex} onChange={e =>setRightQuestion(e.target.value)} className="browser-default ">
                    <option value="" disabled >Choose A Question</option>
                        <RenderQuestionOptions staggedTools={staggedTools} />
                </select>
            </div>
            <div className="input-field col s12 m6">
                  <h5 className='center'>Answers</h5>
                    <select value={rightAnsIndex} onChange={e => setRightAns(e.target.value)} className="icons browser-default">
                    <option value="" disabled >Match An Answer</option>
                        <RenderAnswerOptions staggedTools={staggedTools} />
                </select>

            </div>
                <button  
                    disabled={!rightAnsIndex || !questionIndex && true} 
                onClick={set} className='btn teal center col s6 offset-s3'> Set </button>
            </div>
        )
}

function RenderQuestionOptions({ staggedTools}){
    return staggedTools.map((item,index)=>(
            <option key={index} value={item.index} data-icon="images/sample-1.jpg">{item.label}</option>
        ))
}

function RenderAnswerOptions({ staggedTools }) {
    return staggedTools.map((item, index) => (
        <option key={index} value={item.index} data-icon="images/sample-1.jpg">{item.label}</option>
    ))
}

export default SetRightAnsView;