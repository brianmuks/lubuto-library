//NOTE holds all create lesson components

import React,{useState,useEffect} from "react";
import { NavBar } from "../../common/components/Landing";
import { useLogout } from "../../common/components/Accounts/accountsUtils";
import { getUrlParam, getUrlParams } from "../../utilities/Tasks";
import { Link } from "react-router-dom";
import { COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";

const LANGS = [{_id:'Kikainde',val:'KAO'},{_id:'Bemba',val:'BEM'},{_id:'English',val:'ENG'},{_id:'Cinyanja',val:'CIN'}];
// todo: Push the icon name to the icon array, as items that have been moved

function ViewLessons(props) {
  const { isLoggedOut, logOutUser } = useLogout()
  const [filteredLessons, setlessons] = useState([]);
  const lessons = props.lessons || [];

  useEffect(() => {
    setlessons(lessons);
  },[lessons])

  const onFilter = event => {
    let val = event.target.value;
    val = val.toLowerCase();
    if (val.trim().length === 0) {
      setlessons(lessons);
      console.log("set to degault LANGS");
      return;
    }
    const _filteredLessons = LANGS.filter(
      path => path.toLowerCase().indexOf(val) !== -1
    );
    setlessons(_filteredLessons);
  };

  return (
   <div>
      <NavBar logOutUser={logOutUser} color={'light-blue'} /> 
      <div className='row '>
      <h4 className='center'> Please Select Lesson</h4>
      <div className='col m10 offset-m1'>
      <input
                onChange={onFilter}
                type="search"
                id="image-list-autocomplete-input"
                className="autocomplete"
                placeholder='SEARCH'
              />
         <ul className="collection">
        <RenderOptions filteredLessons={filteredLessons} />
  </ul>
        </div>
    </div>
   </div>
  );
}

function RenderOptions({filteredLessons}){
  // format_shapes score text_fields chrome_reader_mode line_style
const urlParams = getUrlParams();
  return filteredLessons.map((item,index)=>(
    <li key={index} className="collection-item avatar">
    <Link to={`/dashboard/edit_lesson/${item._id}?${urlParams}`}>
    <i className="material-icons circle">format_shapes</i>
    <span className="title">{'LESSON '+(index+1)}</span>
    </Link>
    <a href={`/dashboard/edit_lesson/${item._id}?${urlParams}`} className="secondary-content"><i className="material-icons">radio_button_unchecked</i></a>
  </li>
  ))
}

export default withTracker(() => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  return {
    lessons: COL_Lessons.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(ViewLessons);

