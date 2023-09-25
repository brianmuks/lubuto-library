//NOTE holds all create lesson components

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import EditLanguageModal, {  EDIT_LANGUAGE_MODAL_ID } from "./EditLanguageModal";
import {  saveLanguage } from "./methods";
import { COL_LANGUAGES } from "../../../../lib/Collections";
import RemoveLanguageModal, { REMOVE_LANGUAGE_MODAL_ID } from "./RemoveLanguageModal";

// todo: Push the icon name to the icon array, as items that have been moved

function Language(props) {
  const [filteredlanguages, setlanguages] = useState([]);
  const [renderCounter, setRenderCounter] = useState(0);
  const languages = props.languages || [];
  const [newLanguage, setLanguage] = useState('');

  let editModalRef = React.createRef();
  let delModalRef = React.createRef();

  useEffect(() => {
   setlanguages(languages);
   setRenderCounter(renderCounter + 1);
  }, [languages])

  const onFilter = event => {
    let val = event.target.value;
    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setlanguages(languages);
      return;
    }
    const _filteredlanguages = languages.filter(
      language => language.name.toLowerCase().indexOf(val) !== -1
    );
    setlanguages(_filteredlanguages);
  };
  const onChange  = e =>{
    const val = e.target.value.toString().trim();
    setLanguage(val.toLowerCase());
  }

  const _saveLanguage = e=>{
    saveLanguage({ name: newLanguage, _id: undefined, callback: () => setLanguage('') });
  }

  const _setTargetlanguage = (lang,isEdit) =>{
  //  setTargetlanguage(lang);
    isEdit ? editModalRef.current.click() : delModalRef.current.click();
   
  //SEE <EditLanguageModal /> components for these fileds
    $('#edit-language,#del-language').val(lang.name)
    $('#del-language').text(lang.name)
    $('#edit-language-id,#del-language-id').val(lang._id)
  }

  return (
    <div>
      {/* MODAL TRIGGERS | INVISIBLE TO THE USER */}
      <a ref={editModalRef}  href={`#${EDIT_LANGUAGE_MODAL_ID}`} className=" modal-trigger  "><i className="material-icon cyan-text"></i></a>
      <a ref={delModalRef} href={`#${REMOVE_LANGUAGE_MODAL_ID}`}  className=" modal-trigger "><i className="material-icons red-text"></i></a>
     
      <div className='row'>
        <div className="input-field col s4 right">
          <div className='col m10'>
            <input onChange={onChange} id="new-language" type="text"
             value={newLanguage} className="validate" placeholder={'new Language'} />
          </div>
          <div className='col m2'>
            <a className="waves-effect waves-light btn " onClick={e => _saveLanguage()}  >Save</a>
          </div>
        </div>
        <div className='col m12'>
  
        <h4 className='center'> <code>Languages </code></h4>
        <div className='col m6 offset-m3'>
          <input
            onChange={onFilter}
            type="search"
            id="image-list-autocomplete-input"
            className="autocompleted"
            placeholder='SEARCH'
          />
          <ul className="collection">
              <RenderOptions setlanguage={_setTargetlanguage} filteredlanguages={filteredlanguages} />
          </ul>
          {
            renderCounter && languages.length === 0 && <RenderNoLanguage />
          }
        </div>
  
      </div>
      <RemoveLanguageModal />
          <EditLanguageModal />
      </div>
    </div>
  );
}

function RenderNoLanguage() {
  return (
    <>
      <h6 className="red-text lighten-3">Sorry, You have not added any languages </h6>
    </>
  )

}

function RenderOptions({ filteredlanguages, setlanguage }) {
  return filteredlanguages.map((item, index) => (
    <li key={index} className="collection-item avatar">
      <i className="material-icons circle">translate</i>
        <span className="title">{`      ` + (item.name)}</span>
      <i className=" i-lang-edit right">
        <a  onClick={e => setlanguage(item,true)} className="pointer "><i className="material-icons cyan-text">edit</i></a>
      </i>
      <a onClick={e => setlanguage(item)} className="secondary-content pointer "><i className="material-icons red-text">cancel</i></a>    
    </li>
  ))
}

export default withTracker(() => {
  Meteor.subscribe("langs");
  Meteor.subscribe("users");
  return {
    languages: COL_LANGUAGES.find({}, { sort: { name: 1 } }).fetch()
  };
})(Language);

