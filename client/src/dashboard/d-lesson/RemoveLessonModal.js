import React, { useContext, useState,useEffect } from "react";
import { initModal } from "../../utilities/Form";

export const REMOVE_LESSSON_MODAL_ID = 'REMOVE_LESSSON_MODAL_ID';

const WARNING_TXT = 'WARNING! if you delete this page, all pages here will not be visible until you create page with a "page number" equal to "1" ';

function RemoveLessonModal({ deleteLesson,lessonPageNumber,label}) {

  initModal('#' + REMOVE_LESSSON_MODAL_ID);
  let text = 'Are you sure you want to delete page';
  text = lessonPageNumber === 1 && WARNING_TXT || text;
  return (
    <div id={REMOVE_LESSSON_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
    
          <h6 className='col m12 center'>
          <code>{`${text} "${lessonPageNumber}" `} </code></h6>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={deleteLesson} className=" waves-effect waves-green btn-flat red-text left">Yes</a>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
    </div>
  );
}

export default RemoveLessonModal;
