import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { COL_TOOLS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { TOOLS_STATE } from "./../s-context";
import { addTool } from "./../s-redux/actions/lessonActions";
import { editLesson, saveLesson } from "./methods";
import { ALPHABET,  NUNMBERS } from "../../utilities/constants";


function Lessons(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

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
        <RenderTools tools={props.tools} />

        <li>
          <div className="divider" />
        </li>

        <li className='row'>
          <RenderaNumbers />
        </li>

      </ul>
    </>
  );
}

function RenderTools(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  useEffect(() => {
    // console.log(state.addedTools)
  });

  return [1, 2, 3, 4, 5, 7, 8, 9, 10, 11].map((tool, index) => (
    <li
      key={index}
      onClick={() => {
        // dispatch(addTool(tool, Math.random() + index));
      }}
    >
      <a href="#!" >
        <i className=" teal-text material-icons">gradient</i>
       LESSON {index+1}
      </a>
    </li>
  ));
}


function Renderalphabet(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

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
      <i className={`material-icons ${getColor()}`}>{tool.name}</i>
      </a>
  
  ));
}

function RenderaNumbers(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

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
      className=' col m2'
      key={index}
 
      href="#!">
      <i className={`material-iconss ${getColor()}-text`}>{`${tool.label}.`}</i>
    </a>

  ));
}

export default withTracker(() => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  return {
    tools: COL_TOOLS.find().fetch()
  };
})(Lessons);
