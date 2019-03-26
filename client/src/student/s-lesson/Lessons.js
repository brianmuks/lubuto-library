import React, { useContext, useEffect,useState } from "react";

import { Link } from "react-router-dom";
import {  COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { STUDENT_LESSON_STATE } from "./../s-context";
import {  setLessonId } from "./../s-redux/actions/lessonActions";
import { ALPHABET,  NUNMBERS } from "../../utilities/constants";
import { getUrlParam, } from "../../utilities/Tasks";
import { addEndTime } from "../s-statistics/methods";


function Lessons({lessons,match}) {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);


  const [studenName, setStudentName] = useState('');

  useEffect(() => {

    setTimeout(() => {
      Meteor.user() && setStudentName("" + Meteor.user().profile.name)
    }, 500);

  })


  return (
    <>
      <span to={'#'} className="btn right blue-grey lighten-2">{studenName}</span>
      <Link to={'/language_selector/?n=lessons'} className="btn right blue">Lessons</Link>
      <Link to={'/'} className="btn right cyan">Home</Link>
      <ul id="slide-out" className="sidenav  sidenav-fixed">
        <li className='row'>
          <Renderalphabet />
        </li>
        <li>
          <a href="#!" className='teal-text'><h4>Lessons</h4></a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <RenderLessons lang={state.language}  match={match} dispatch={dispatch} lessons={lessons} />
        <li>
          <div className="divider" />
        </li>

        <li className='row numbers-list'>
          <RenderaNumbers />
        </li>

      </ul>

    </>
  );
}

function RenderLessons({ dispatch, lessons, lang, match}) {
  const setLesson = lesson=>{
    dispatch(setLessonId(lesson._id));
    const link = `${match.path}/?lang=${getUrlParam('lang')}&id=${lesson._id}&n=${lesson.meta.lessonNumber}`
    console.log();

    getUrlParam('id') !== lesson._id && addEndTime(lesson._id);

    location.href = link;
  //  window.history.pushState({},'',link);
  }

  return lessons.map((item, index) => (
    <li
      className={` ${item.meta.lessonNumber === parseInt(getUrlParam('n')) && "blue-grey lighten-3"}`}
      key={index}
      onClick={() => setLesson(item)}
    >
      <a href={'#'} >
        <i className=" teal-text material-icons">gradient</i>
        LESSON {item.meta.lessonNumber}
      </a>
    </li>
  ));
}


function Renderalphabet(props) {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);

  useEffect(() => {
    // console.log(state.addedTools)
  });
let counter = 0;
const colors = ['red','blue','pink','yellow','brown','orange','purple','indigo'];
  function getColor(key){
    
    if (counter > 7) {
      counter = 0;
    }
   return colors[counter++];
  }

  return ALPHABET.map((tool, index) => (
   
      <a 
      className=' col m2'
      key={index}
      href="#!">
      <i className={`material-icons ${getColor()}-text`}>{tool.name}</i>
      </a>
  
  ));
}

function RenderaNumbers(props) {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);

  useEffect(() => {
    // console.log(state.addedTools)
  });
  let counter = 0;
  const colors = ['red', 'blue', 'pink', 'yellow', 'brown', 'orange', 'purple', 'indigo'];
  function getColor(key) {

    if (counter > 7) {
      counter = 0;
    }
    return colors[counter++];
  }

  return NUNMBERS.map((tool, index) => (

    <a
      className=' col m2 '
      key={index}
 
      href="#!">
      <i className={`material-iconss ${getColor()}-text`}>{`${tool.label}.`}</i>
    </a>

  ));
}
//COMMENT
/**
 * only lessons with pageNumber= 1 are fetched
 * 
 */
export default withTracker(() => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  const query = { 'meta.lang': lang,'meta.lessonPageNumber':1 };
  return {
    lessons: COL_Lessons.find(query).fetch()
  };
})(Lessons);
