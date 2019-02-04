import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { COL_TOOLS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { TOOLS_STATE } from "./../d-context";
import { addTool } from "./../d-redux/actions/lessonActions";
import { editLesson, saveLesson } from "./methods";
import { ALPHABET } from "../../utilities/constants";


function Tools(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  return (
    <>
      <Link to={'/dashboard/lesson_prev'} className="btn right red">Preview</Link>

      <ul id="slide-out" className="sidenav  sidenav-fixed">
        <li onClick={() => props.isPreview && editLesson(state.staggedTools) || saveLesson(state.staggedTools)}>
          <button className="btn right red">{props.isPreview && `Update` || 'Save'}</button>
          <div className="user-view ">
            <a href="#email">
              <span className="white-text email">olivier@gmail.com</span>
            </a>
          </div>
        </li>

        <li>
          <a href="#!">Tools</a>
        </li>

        <li className='row'>
          <Renderalphabet />
        </li>


        <li>
          <div className="divider" />
        </li>
        <RenderalSpecialTools />
        <li>
          <div className="divider" />
        </li>
        <RenderTools tools={props.tools} />
      </ul>
    </>
  );
}

function RenderTools(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  useEffect(() => {
    // console.log(state.addedTools)
  });

  return props.tools.map((tool, index) => (
    <li
      key={index}
      onClick={() => {
        dispatch(addTool({ ...tool, type: 'icon'}, Math.random() + index));
      }}
    >
      <a href="#!">
        <i className="material-icons">{tool.name}</i>
        {tool.label}
      </a>
    </li>
  ));
}


function Renderalphabet(props) {
  const { state, dispatch } = useContext(TOOLS_STATE);

  useEffect(() => {
    // console.log(state.addedTools)
  });

  return ALPHABET.map((tool, index) => (
   
      <a 
      className=' col m2'
      key={index}
      onClick={() => {
        dispatch(addTool({
          ...tool,type:'icon', _id: new Meteor.Collection.ObjectID().valueOf()
        }, Math.random() + index));
      }}
      href="#!">
        <i className="material-icons">{tool.name}</i>
      </a>
  
  ));
}



function RenderalSpecialTools() {
  const { state, dispatch } = useContext(TOOLS_STATE);


  
  const specialTools = [
    { name:'sort_by_alpha',label:'Text',type:'text',text:'Some text to be edited'},
  ];

  return specialTools.map((tool, index) => (

    <li
      key={index}
      onClick={() => {
        dispatch(addTool(tool, Math.random() + index));
      }}
    >
      <a href="#!">
        <i className="material-icons">{tool.name}</i>
        {tool.label}
      </a>
    </li>

  ));
}





export default withTracker(() => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  return {
    tools: COL_TOOLS.find().fetch()
  };
})(Tools);
