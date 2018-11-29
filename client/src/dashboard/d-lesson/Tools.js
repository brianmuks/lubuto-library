import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { COL_TOOLS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { TOOLS_STATE } from "./../d-context";
import { addTool } from "./../d-redux/actions/lessonActions";

function Tools(props) {
  return (
    <>
      <ul id="slide-out" className="sidenav  sidenav-fixed">
        <li>
          <button className="btn right red">Save</button>

          <div className="user-view ">
            <a href="#email">
              <span className="white-text email">olivier@gmail.com</span>
            </a>
          </div>
        </li>

        <li>
          <a href="#!">Tools</a>
        </li>
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
        dispatch(addTool(tool,index));
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
