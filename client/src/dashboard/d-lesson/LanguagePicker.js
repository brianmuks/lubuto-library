import React, {  useState,useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { COL_LANGUAGES } from "../../../../lib/Collections";
import { initModal } from "../../utilities/Form";
import { getUrlParam } from "../../utilities/Tasks";
export const LANGUAGE_PICKER_MODAL_ID = 'LANGUAGE_PICKER_MODAL_ID';

function LanguageSelector(props) {


  let langs = {};

  let btnCloseRef = React.createRef()
    const onClick = lang =>{
     langs[lang]=lang;
    }

  let checkBoxesStatus = false;
  const checkAll = newLangs => {
    $('input[type=checkbox]').click();
    checkBoxesStatus = !checkBoxesStatus;

    if (checkBoxesStatus) {
      for (let lang in newLangs) {
        lang = newLangs[lang].label;
        //maintaining the structure with onClick() above
       langs[lang] = lang;
      }
    }else{
      langs ={};
    }

  }

    const done = e=>{
      if (Object.keys(langs).length === 0) {
      //  btnCloseRef.current.click();
      M.toast({html:'Please select alteast one langauge'})
      return
      }

      props.callBack(langs);
      btnCloseRef.current.click();
      $('input[type=checkbox]').attr("checked",false);
    }


  initModal('#' + LANGUAGE_PICKER_MODAL_ID);
  return (
    <div id={LANGUAGE_PICKER_MODAL_ID} className="modal remove-tool-modal">
      <div className="modal-content">
        <div className="modal-header">
          <a href="#!" onClick={done} className=" waves-effect waves-green btn-flat red-text right">Done</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">X</a>
        </div>
        <App {...props} checkAll={checkAll} onClick={onClick} />
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={done} className=" waves-effect waves-green btn-flat red-text right">Done</a>
        <a ref={btnCloseRef} href="#!" className="modal-close waves-effect waves-green btn-flat left">X</a>
      </div>
    </div>
  );
}


function App(props) {

  const [filteredLANGS, setLANGs] = useState([]);

  useEffect(() => {
    setLANGs(props.langs)
  }, [props.langs])


  const onFilter = event => {
    let val = event.target.value;
    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setLANGs(props.langs);
      return;
    }
    const filteredLangs = props.langs.filter(
      path => path.label.toLowerCase().indexOf(val) !== -1 
    );
    setLANGs(filteredLangs);
  };



  return (
    <>
        <div>
          <div className='row '>
            <h4 className='center'> Please Select Language</h4>
            <div className='col m10 offset-m1'>
              <input
                onChange={onFilter}
                type="search"
                id="image-list-autocomplete-input"
                className="autocomplete"
                placeholder='SEARCH'
              />
 
              <ul className="collection">


              <li  className="collection-item avatar">
                <i className="material-icons circle"></i>
                <p className='right'>
                  <label>
                    <input onClick={e=>props.checkAll(props.langs)} type="checkbox" />
                    <span></span>
                  </label>
                </p>
              </li>


              <RenderOptions onClick={props.onClick} filteredLANGS={filteredLANGS} />
              </ul>
            </div>
          </div>
        </div>
    </>
  );
}

function RenderOptions({ filteredLANGS,onClick }) {

  useEffect(() => {

  })

  return filteredLANGS.map((item, index) => (
    <li key={index} className="collection-item avatar">
        <i className="material-icons circle">translate</i>
      <p className='right'>
        <label>
          <input onClick={e => onClick(item.label)} type="checkbox" />
          <span></span>
        </label>
      </p>
      {item.name}
    </li>
  ))
}

export default withTracker(params => {
  Meteor.subscribe("users");
  Meteor.subscribe("userStats");
  const label = getUrlParam('lang')
  const query = params.filter && { label:{$ne:label}} || {};
  return {

    langs: COL_LANGUAGES.find(
      query,
      { sort: { name: -1 } }
    )
      .fetch()
  };
})(LanguageSelector);


