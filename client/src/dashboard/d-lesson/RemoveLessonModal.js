import React, { useContext, useState,useEffect } from "react";
import { initModal } from "../../utilities/Form";

export const REMOVE_LESSSON_MODAL_ID = 'REMOVE_LESSSON_MODAL_ID';

function RemoveLessonModal({deleteLesson,label}) {

  initModal('#' + REMOVE_LESSSON_MODAL_ID);

  return (
    <div id={REMOVE_LESSSON_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
    
          <h6 className='col m12 center'>Are you sure you want to delete lesson
            <code>{` "${label}" `} </code></h6>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={deleteLesson} className=" waves-effect waves-green btn-flat red-text left">Yes</a>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
    </div>
  );
}

export default RemoveLessonModal;
