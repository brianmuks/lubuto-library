//NOTE holds all create lesson components

import React, { useReducer, useEffect,useState } from "react";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { lessonReducer } from "./../s-redux/reducers/lessonReducer";
import { withTracker } from "meteor/react-meteor-data";
import { COL_Lessons } from "../../../../lib/Collections";
import { editStaggedTools, setLessonId } from "../s-redux/actions/lessonActions";
import Lessons from "./Lessons";
import MainScreen from "./MainScreen";
import Pages from "./Pages";
import ScoreBoard from "./ScoreBoard";
import { getUrlParam } from "../../utilities/Tasks";
import { addStartTime } from "../s-statistics/methods";

const initialState = {
  language:getUrlParam('lang'),
  tools: [],
  addedTools: [],
  staggedTools: [],
  editTool: {}
}

// todo: Push the icon name to the icon array, as items that have been moved

function StudentLesson(props) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const [lessonId, _setLessonId] = useState(null);

  useEffect(() => {
    if (!props.lesson) {
      return
    }
  
    const { lessonNumber, lang, lessonPageNumber } = props.lesson.meta;
    const lessonId = props.lesson._id;

    addStartTime({ lessonId, lang, lessonNumber, lessonPageNumber})
    let x = (props.lesson.content);
    _setLessonId(props.lesson._id);
    dispatch(setLessonId(props.lesson._id));
    var result = Object.keys(x).map(function (key) {
      return x[key];
    });
    // setTools(result)
    // console.log(result);
    dispatch(editStaggedTools(result));
  }, [props.lesson]);

  return (
    <STUDENT_LESSON_STATE.Provider value={{ state, dispatch }}>
      <section style={{ position: 'fixed' }}>
        <Lessons match={props.match}  />
        <div className="row">
          <MainScreen isPreview/>
          <Pages match={props.match} lessonId={lessonId} />
          <ScoreBoard />
        </div>
      </section>
    </STUDENT_LESSON_STATE.Provider>
  );
}

// export default CreateLesson;

export default withTracker(({props}) => {
  Meteor.subscribe("lessons");
  Meteor.subscribe("users");
  const lang = getUrlParam('lang');
  const _id = getUrlParam('id');
  const query = _id && {_id} || { 'meta.lang': lang };
  return {
    lesson: COL_Lessons.findOne({ _id}, { sort: { createdAt: -1 } })
  };
})(StudentLesson);