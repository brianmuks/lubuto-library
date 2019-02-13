import React, { useContext, useState,useEffect } from "react";
import { TOOLS_STATE } from "../d-context";
import { initModal } from "../../utilities/Form";
import {  editStaggedTools } from "./../d-redux/actions/lessonActions";

export const STAGGED_TOOLS_MODAL_ID = 'STAGGED_TOOLS_MODAL_ID';

function StagedToolsLabelEditor({toolIndex,oldLabel}) {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, editTool } = state;

  useEffect(()=>{
    $('#tool_label').val(oldLabel);
  })

  initModal('#' + STAGGED_TOOLS_MODAL_ID);
  const done = () => {
    const newLabel =  $('#tool_label').val();
    if (newLabel.trim().length === 0) {
       M.toast({ html: `label can't be empty` });
      return
    }
 
    let tools = staggedTools.map(i => (
      i.index == toolIndex && { ...i, label: newLabel} || i
    ))

    $('#' + STAGGED_TOOLS_MODAL_ID).modal('close');

    setTimeout(() => {
      dispatch(editStaggedTools(tools));
      console.log('label edited');
    }, 100);

  }  

  return (
    <div id={STAGGED_TOOLS_MODAL_ID} className="modal">
      <div className="modal-content">
        <h4>Change Tool Label</h4>
        <div className="row">
          <div className="input-field col s6">
            <input maxLength={13}  placeholder="Placeholder" id="tool_label" type="text" className="validate" />
              <label htmlFor="tool_label">New Label</label>
        </div>
          <button onClick={() => done()} className='btn'>Done</button>

</div>
      </div>
      <div className="modal-footer">
        {/* <a href="#!" className=" waves-effect waves-green btn-flat left">Done</a> */}
        <a href="#!" id='close-modal' className="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div>
  );
}

export default StagedToolsLabelEditor;
