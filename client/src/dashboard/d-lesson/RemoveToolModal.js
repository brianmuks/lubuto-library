import React, { useContext, useState,useEffect } from "react";
import { TOOLS_STATE } from "../d-context";
import { initModal } from "../../utilities/Form";
import {  editStaggedTools } from "../d-redux/actions/lessonActions";

export const REMOVE_TOOL_MODAL_ID = 'REMOVE_TOOL_MODAL_ID';

function RemoveToolModal({removeTool,label}) {
  let btnCloseRef = React.createRef();

  initModal('#' + REMOVE_TOOL_MODAL_ID);

  const _removeTool = e =>{
    btnCloseRef.current.click();
    removeTool()
  }

  return (
    <div id={REMOVE_TOOL_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
    
          <h6 className='col m12 center'>Are you sure you want to remove
            <code>{` "${label}" `} </code>{` tool?`}</h6>

      </div>
      <div className="modal-footer">

        <a href="#!" onClick={_removeTool} className=" waves-effect waves-green btn-flat red-text left">Yes</a>
        <a ref={btnCloseRef} href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
    </div>
  );
}

export default RemoveToolModal;
