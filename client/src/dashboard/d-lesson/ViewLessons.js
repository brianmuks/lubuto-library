//NOTE holds all create lesson components

import React,{useState,useEffect} from "react";
import { getUrlParam, getUrlParams } from "../../utilities/Tasks";
import { Link } from "react-router-dom";
import { COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import RemoveLessonModal, { REMOVE_LESSSON_MODAL_ID } from "./RemoveLessonModal";
import { deleteLesson } from "./methods";
import NavBar from "../../components/Layout/NavBar";

  const LANGS = [{_id:'Kikainde',val:'KAO'},{_id:'Bemba',val:'BEM'},{_id:'English',val:'ENG'},{_id:'Cinyanja',val:'CIN'}];
// todo: Push the icon name to the icon array, as items that have been moved

function ViewLessons(props) {
  const { isLoggedOut, logOutUser } = useLogout()
  const [filteredLessons, setlessons] = useState([]);
  const [renderCounter, setRenderCounter] = useState(0);
  const [lesson, setlesson] = useState({});
  const lessons = props.lessons || [];


  useEffect(() => {
    setlessons(lessons);
    setRenderCounter(renderCounter+1);
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
      <NavBar  color={'light-blue'} /> 
      <div className='row'>
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
            <RenderOptions setlesson={setlesson}  filteredLessons={filteredLessons} />
  </ul>
          {
           renderCounter  && lessons.length === 0 && <RenderNoLesson />
          }
        </div>
    </div>
      <RemoveLessonModal label={lesson.meta && lesson.meta.lessonNumber} deleteLesson={() => deleteLesson(lesson._id)} />
   </div>
  );
}

function RenderNoLesson(){
  return (
     <>
      <h6 className="red-text lighten-3">Sorry, You have no Lesson under this language </h6>
      <Link to={`/dashboard/create_lesson_type/?lang=${getUrlParam('lang')}`}>Create lesson</Link>
    </>

  )

}

function RenderOptions({ filteredLessons, setlesson}){
  // format_shapes score text_fields chrome_reader_mode line_style

const urlParams = getUrlParams();
  return filteredLessons.map((item,index)=>(
    <li key={index} className="collection-item avatar">
    <Link to={`/dashboard/edit_lesson/${item._id}?${urlParams}`}>
    <i className="material-icons circle">format_shapes</i>
        <span className="title">{'LESSON ' + (item.meta.lessonNumber)}</span>
    </Link>
      <a href={`#${REMOVE_LESSSON_MODAL_ID}`} onClick={e=>setlesson(item)} className="secondary-content modal-trigger"><i className="material-icons red-text">cancel</i></a>
  </li>
  ))
}

export default withTracker(() => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  const query = {'meta.lang':lang};
  return {
    lessons: COL_Lessons.find(query, { sort: { createdAt: -1 } }).fetch()
  };
})(ViewLessons);

