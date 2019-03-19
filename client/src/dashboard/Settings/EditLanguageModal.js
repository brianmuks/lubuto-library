import React, { useContext, useState,useEffect } from "react";
import { initModal } from "../../utilities/Form";
import { saveLanguage } from "./methods";

export const EDIT_LANGUAGE_MODAL_ID = 'EDIT_LANGUAGE_MODAL_ID';


function EditLanguageModal() {
  let btnCloseRef = React.createRef();
  const _saveLanguage = e => {
   const name = $('#edit-language').val()
   const _id = $('#edit-language-id').val()
   saveLanguage({ name, _id, callback: () => {
      btnCloseRef.current.click();
      $('#lang-close-modal-btn').trigger('click');
    } });
  }

  initModal('#' + EDIT_LANGUAGE_MODAL_ID);
  return (
    <div id={EDIT_LANGUAGE_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
        <h6 className='col m12 center'>
          <code>Edit Language </code></h6>
      </div>
        <div className="input-field col s4 ">
          <div className='col m10'>
            <input  id="edit-language" type="text"
               className="validate" placeholder={'new Language'} />
          <input id="edit-language-id" type="hidden" />
          </div>
         
        </div>
      <div className="modal-footer">
        <a href="#!" onClick={_saveLanguage} className=" waves-effect waves-green btn-flat red-text left">Save</a>
        <a ref={btnCloseRef} href="#!" id="lang-close-modal-btn"  className=" modal-close waves-effect waves-green btn-flat">Cancel</a>
      </div>
      </div>
  );
}

export default EditLanguageModal;
