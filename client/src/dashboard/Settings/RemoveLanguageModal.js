import React, { useContext, useState, useEffect } from "react";
import { initModal } from "../../utilities/Form";
import { deleteLanguage } from "./methods";

export const REMOVE_LANGUAGE_MODAL_ID = 'REMOVE_LANGUAGE_MODAL_ID';


function RemoveLanguageModal() {
  let btnCloseRef = React.createRef();
  const _deleteLanguage = e => {
    const _id = $('#del-language-id').val();
    const name = $('#del-language').text();
    deleteLanguage({
      name, _id, callback: () => {
        btnCloseRef.current.click();
        $('#lang-close-modal-btn').trigger('click');
      }
    });
  }

  initModal('#' + REMOVE_LANGUAGE_MODAL_ID);
  return (
    <div id={REMOVE_LANGUAGE_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
        <h6 className='col m12 center'>
          <code>Delete Language </code></h6>
      </div>
      <div className="input-field col s12 ">
        <div className='col m10'>
          <code >
            {`Are you sure you want to delete "`}
        <span id="del-language" className='red-text'></span>
            {`" Language ?`}
          </code>
          <input id="del-language-id" type="hidden" />
        </div>

      </div>
      <div className="modal-footer">
        <a href="#!" onClick={_deleteLanguage} className=" waves-effect waves-green btn-flat red-text left">Yes</a>
        <a ref={btnCloseRef} href="#!" id="lang-close-modal-btn" className=" modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
    </div>
  );
}

export default RemoveLanguageModal;
