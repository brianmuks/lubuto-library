//NOTE holds all create lesson components

import React, { useState, useEffect } from "react";
import { getUrlParam, getUrlParams } from "../../utilities/Tasks";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import EditLanguageModal, { REMOVE_LESSSON_MODAL_ID, EDIT_LANGUAGE_MODAL_ID } from "./EditLanguageModal";
import { deleteLesson, saveLanguage } from "./methods";
import { COL_LANGUAGES } from "../../../../lib/Collections";
import RemoveLanguageModal, { REMOVE_LANGUAGE_MODAL_ID } from "./RemoveLanguageModal";

const LANGS = [{ _id: 'Kikainde', val: 'KAO' }, { _id: 'Bemba', val: 'BEM' }, { _id: 'English', val: 'ENG' }, { _id: 'Cinyanja', val: 'CIN' }];
// todo: Push the icon name to the icon array, as items that have been moved

function Language(props) {
  const [filteredlanguages, setlanguages] = useState([]);
  const [renderCounter, setRenderCounter] = useState(0);
  const [language, setlanguage] = useState({});
  const languages = props.languages || [];
  const [newLanguage, setLanguage] = useState('');
  const [targetLanguage, setTargetlanguage] = useState({});

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
      console.log("set to degault LANGS");
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

  const _setTargetlanguage = lang =>{
  //  setTargetlanguage(lang);
   delModalRef.current.click();
   
  //SEE <EditLanguageModal /> components for these fileds
    $('#edit-language,#del-language').val(lang.name)
    $('#del-language').text(lang.name)
    $('#edit-language-id,#del-language-id').val(lang._id)
  }


  return (
    <div>
      <a ref={editModalRef}  href={`#${EDIT_LANGUAGE_MODAL_ID}`} className=" modal-trigger  "><i className="material-icon cyan-text"></i></a>
      <a ref={delModalRef} href={`#${REMOVE_LANGUAGE_MODAL_ID}`}  className=" modal-trigger"><i className="material-icons red-text"></i></a>
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
            renderCounter && languages.length === 0 && <RenderNoLesson />
          }
        </div>
  
      </div>
      <RemoveLanguageModal />
          <EditLanguageModal />
      </div>
    </div>
  );
}

function RenderNoLesson() {
  return (
    <>
      <h6 className="red-text lighten-3">Sorry, You have no Lesson under this language </h6>
      <Link to={`/dashboard/create_lesson_type/?lang=${('lang')}`}>Create lesson</Link>
    </>
  )

}

function RenderOptions({ filteredlanguages, setlanguage }) {
  const urlParams = '';
  return filteredlanguages.map((item, index) => (
    <li key={index} className="collection-item avatar">
      <i className="material-icons circle">translate</i>
        <span className="title">{`      ` + (item.name)}</span>
      <i className=" i-lang-edit right">
        <a  onClick={e => setlanguage(item)} className="pointer "><i className="material-icons cyan-text">edit</i></a>
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

