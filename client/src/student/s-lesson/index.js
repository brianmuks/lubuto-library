//NOTE holds all create lesson components

import React, { useReducer, useEffect } from "react";
import { TOOLS_STATE } from "./../s-context";
import { lessonReducer } from "./../s-redux/reducers/lessonReducer";
import { withTracker } from "meteor/react-meteor-data";
import { COL_Lessons } from "../../../../lib/Collections";
import { editStaggedTools } from "../s-redux/actions/lessonActions";
import Lessons from "./Lessons";
import MainScreen from "./MainScreen";
import Pages from "./Pages";
import ScoreBoard from "./ScoreBoard";

const initialState = {
  data: {
    x: 0,
    y: 0,
    node: {},
    icons: [],
    _id: '',
    name: ''
  },
  tools: [],
  addedTools: [],
  staggedTools: [],
  editTool: {}
}

// todo: Push the icon name to the icon array, as items that have been moved

function StudentLesson(props) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);

  useEffect(() => {

    if (!props.lesson) {
      return
    }
    let x = (props.lesson);
    var result = Object.keys(x).map(function (key) {
      return x[key];
    });
    // setTools(result)
    // console.log(result);
    dispatch(editStaggedTools(result));
  }, [props.lesson]);

  return (
    <TOOLS_STATE.Provider value={{ state, dispatch }}>
      <section style={{ position: 'fixed' }}>
        <Lessons />
        <div className="row">
          <MainScreen isPreview/>
          <Pages />
          <ScoreBoard />
        </div>
      </section>
    </TOOLS_STATE.Provider>
  );
}



// export default CreateLesson;



export default withTracker(() => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  return {
    lesson: COL_Lessons.findOne({}, { sort: { createdAt: -1 } })
  };
})(StudentLesson);