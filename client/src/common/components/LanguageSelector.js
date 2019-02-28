//NOTE holds all create lesson components

import React,{useState} from "react";
import { NavBar } from "./Landing";
import { useLogout } from "./Accounts/accountsUtils";
import { getUrlParam } from "../../utilities/Tasks";
import { Link } from "react-router-dom";

const LANGS = [{ label: 'Kikaonde', val: 'kao' }, { label: 'Bemba', val: 'bem' }, { label: 'English', val: 'eng' }, { label: 'Cinyanja', val: 'cin' }];


// todo: Push the icon name to the icon array, as items that have been moved

function LanguageSelector(props) {

  const { isLoggedOut, logOutUser } = useLogout()
  const [filteredLANGS, setLANGs] = useState(LANGS);

  const onFilter = event => {
    let val = event.target.value;

    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setLANGs(LANGS);
      console.log("set to degault LANGS");
      return;
    }
    const filteredLangs = LANGS.filter(
      path => path.label.toLowerCase().indexOf(val) !== -1
    );
    setLANGs(filteredLangs);
  };

  return (
   <div>
      <NavBar logOutUser={logOutUser} color={'light-blue'} /> 
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
  );
}

function RenderOptions({filteredLANGS}){
const nextPath = getUrlParam('n');
  return filteredLANGS.map((item,index)=>(
    <li key={index} className="collection-item avatar">
    <Link to={`/dashboard/${nextPath}/?lang=${item.val}`}>
    <i className="material-icons circle">translate</i>
    <span className="title">{item.label}</span>
    </Link>
    <a href={`/dashboard/${nextPath}/?lang=${item.val}`} className="secondary-content"><i className="material-icons">radio_button_unchecked</i></a>
  </li>
  ))
}

export default LanguageSelector;
