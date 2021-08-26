//NOTE holds all create lesson components

import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import { useLogout } from "../Accounts/accountsUtils";
import { getUrlParam } from "../utilities/Tasks";
import { Meteor } from "meteor/meteor";
import Footer from "./Layout/Footer";
import NavBar from "./Layout/NavBar";
import { COL_LANGUAGES } from "../../../lib/Collections";
const LANGS = [{ label: 'Kikaonde', val: 'kao' }, { label: 'Bemba', val: 'bem' }, { label: 'English', val: 'eng' }, { label: 'Cinyanja', val: 'cin' }];


// todo: Push the icon name to the icon array, as items that have been moved

function LanguageSelector(props) {

  const { isLoggedOut, logOutUser } = useLogout()
  const [filteredLANGS, setLANGs] = useState([]);

  useEffect(()=>{
    setLANGs(props.langs)
  }, [props.langs])


  const onFilter = event => {
    let val = event.target.value;
    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setLANGs(props.langs);
      console.log("set to degault LANGS");
      return;
    }
    const filteredLangs = props.langs.filter(
      path => path.label.toLowerCase().indexOf(val) !== -1
    );
    setLANGs(filteredLangs);
  };

  return (
    <>
   
   <header>
        <NavBar />
   </header>

<main>
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
        <RenderOptions filteredLANGS={filteredLANGS} />
  </ul>
        </div>
    </div>
   </div>
   </main>
   <Footer />
   </>
  );
}

function RenderOptions({filteredLANGS}){

  const [adminLink, setAdminLink] = useState('');

  useEffect(()=>{

    setTimeout(() => {
     // Meteor.user().profile.role === 'admin' &&
       // setAdminLink("/dashboard")
    }, 300);
  })


const nextPath = getUrlParam('n');
  return filteredLANGS.map((item,index)=>(
    <li key={index} className="collection-item avatar">
    <Link to={`${adminLink}/${nextPath}/?lang=${item.label}`}>
    <i className="material-icons circle">translate</i>
    <span className="title">{item.name}</span>
    </Link>
    <a href={`${adminLink}/${nextPath}/?lang=${item.label}`} className="secondary-content"><i className="material-icons">radio_button_unchecked</i></a>
  </li>
  ))
}

export default withTracker(params => {
  Meteor.subscribe("pub_col_languages");
  return {
    
    langs:COL_LANGUAGES.find(
      {},
      { sort: { name: -1 } }
    )
      .fetch()
  };
})(LanguageSelector);


