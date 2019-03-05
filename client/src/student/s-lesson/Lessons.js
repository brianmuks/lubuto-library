import React, { useContext, useEffect,useState } from "react";

import { Link } from "react-router-dom";
import { COL_TOOLS, COL_Lessons } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { addTool, setLessonId } from "./../s-redux/actions/lessonActions";
import { editLesson, saveLesson } from "./methods";
import { ALPHABET,  NUNMBERS } from "../../utilities/constants";
import { getUrlParam, getUrlParams } from "../../utilities/Tasks";


function Lessons({lessons,match}) {
  const { state, dispatch } = useContext(STUDENT_LESSON_STATE);

  return (
    <>
      <Link to={'/dashboard/lesson_prev'} className="btn right green">Grade Two</Link>
      <Link to={'/dashboard/lesson_prev'} className="btn right red">Hi, John Mwale</Link>
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
    console.log()
  }


  return lessons.map((item, index) => (
    <li
    className={` ${item._id === getUrlParam('id') && "blue-grey lighten-3"}`}
      key={index}
      // onClick={() => setLesson(item)}
    >
      <Link to={`${match.path}/?lang=${getUrlParam('lang')}&id=${item._id}`} >
        <i className=" teal-text material-icons">gradient</i>
       LESSON {index+1}
      </Link>
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

export default withTracker(() => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  const query = { 'meta.lang': lang };
  return {
    lessons: COL_Lessons.find(query).fetch()
  };
})(Lessons);
