//NOTE holds all create lesson components

import React,{useState,useEffect} from "react";
import { getUrlParam, getUrlParams } from "../../utilities/Tasks";
import { Link } from "react-router-dom";
import { COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import NavBar from "../../components/Layout/NavBar";
import Footer from "../../components/Layout/Footer";
import LanguagePicker, { LANGUAGE_PICKER_MODAL_ID } from "./LanguagePicker";
import { copyLesson } from "./methods";
// todo: Push the icon name to the icon array, as items that have been moved

function ViewLessons(props) {
  const [filteredLessons, setlessons] = useState([]);
  const [renderCounter, setRenderCounter] = useState(0);
  // const [targetCopyLesson, setTargetCopyLesson] = useState(null);
  const lessons = props.lessons || [];
  let langPickerModalRef = React.createRef();
  let targetCopyLesson = {};

  useEffect(() => {
    setlessons(lessons);
    console.log("set to degault LANGS", lessons);
    setRenderCounter(renderCounter+1);
  },[lessons])

  const onFilter = event => {
    let val = event.target.value;
    // val = val.toLowerCase();
    if (val.trim().length === 0) {

      setlessons(lessons);
      return;
    }
    const _filteredLessons = lessons.filter(
      lesson => lesson.meta.lessonNumber == val
    );
    setlessons(_filteredLessons);
  };

  const _copyLesson = newLangs =>{
    console.log(newLangs, 'langs',targetCopyLesson);
    copyLesson({...targetCopyLesson,newLangs});
  }

  const _setTargetCopyLesson = lessonData=>{
    //setTargetCopyLesson(lessonData);
    targetCopyLesson = lessonData;
    langPickerModalRef.current.click();
  }

  return (
    <>
      <a ref={langPickerModalRef} href={`#${LANGUAGE_PICKER_MODAL_ID}`} className=" modal-trigger  "><i className="material-icon cyan-text"></i></a>

    <LanguagePicker callBack={_copyLesson} />
    <NavBar />
   <div>
      <div className='row'>
      <h4 className='center'> Please Select Lesson</h4>
      <div className='col m10 offset-m1'>
      <input
                onChange={onFilter}
                type="number"
                id="image-list-autocomplete-input"
                className="autocomplete"
                placeholder='SEARCH'
              />
         <ul className="collection">
              <RenderOptions onCopy={_setTargetCopyLesson}   filteredLessons={filteredLessons} />
  </ul>
          {
           renderCounter  && lessons.length === 0 && <RenderNoLesson />
          }
        </div>
    </div>
  
   </div>
   <Footer />
   </>
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

function RenderOptions({ filteredLessons, onCopy}){
  // format_shapes score text_fields chrome_reader_mode line_style

const urlParams = getUrlParams();
  return filteredLessons.map((item,index)=>(
    <li key={index} className="collection-item avatar">
      <Link to={`/dashboard/view_lesson_pages/?ln=${item.meta.lessonNumber}&${urlParams}`}>
    <i className="material-icons circle">format_shapes</i>
        <span className="title">{'LESSON ' + (item.meta.lessonNumber)}</span>
    </Link>
      <span onClick={e => onCopy({ lang: item.meta.lang, lessonNumber: item.meta.lessonNumber})} to={`/dashboard/view_lesson_pages/?ln=${item.meta.lessonNumber}&${urlParams}`} className="secondary-content"><i className="material-icons green-text">library_books</i></span>
      {/* <i className="col material-icons cyan-text">send</i> */}
  </li>
  ))
}

export default withTracker(() => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  const query = { 'meta.lang': lang, 'meta.lessonPageNumber': 1 };

  return {
    lessons: COL_Lessons.find(query, { sort: { createdAt: -1 } }).fetch()
  };
})(ViewLessons);

