//NOTE holds all create lesson components

import React, { useReducer, useEffect, useState } from "react";
import { STUDENT_LESSON_STATE } from "./../s-context";
import { lessonReducer } from "./../s-redux/reducers/lessonReducer";
import { withTracker } from "meteor/react-meteor-data";
import { COL_Lessons } from "../../../../lib/Collections";
import {
  editStaggedTools,
  setLessonId,
} from "../s-redux/actions/lessonActions";
import Lessons from "./Lessons";
import MainScreen from "./MainScreen";
import Pages from "./Pages";
import ScoreBoard from "./ScoreBoard";
import { getUrlParam } from "../../utilities/Tasks";
import { addStartTime } from "../s-statistics/methods";
import SpeakerIntruction from "./SpeakerIntruction";

const initialState = {
  language: getUrlParam("lang"),
  tools: [],
  addedTools: [],
  staggedTools: [],
  editTool: {},
};

// todo: Push the icon name to the icon array, as items that have been moved

function StudentLesson(props) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const [lessonId, _setLessonId] = useState(null);
  const [lessonType, setLessonType] = useState(null);

  useEffect(() => {
    if (!props.lesson) {
      return;
    }

    const { lessonNumber, lang, lessonPageNumber, type } = props.lesson.meta;
    const lessonId = props.lesson._id;


    let x = props.lesson.content;
    
    if (!x) return;
    
    addStartTime({ lessonId, lang, lessonNumber, lessonPageNumber });
    _setLessonId(props.lesson._id);
    dispatch(setLessonId(props.lesson._id));
    var result = Object.keys(x).map(function (key) {
      return x[key];
    });
    dispatch(editStaggedTools(result));
  }, [props.lesson]);

  return (
    <>
      <main>
        <STUDENT_LESSON_STATE.Provider value={{ state, dispatch }}>
          <section style={{ position: "relative" }}>
            <SpeakerIntruction lesson={props.lesson} />
            <Lessons match={props.match} />
            <div className="row">
              <MainScreen lesson={props.lesson} isPreview />
              <Pages match={props.match} lessonId={lessonId} />
              <ScoreBoard lesson={props.lesson} />
            </div>
          </section>
        </STUDENT_LESSON_STATE.Provider>
      </main>
    </>
  );
}

// export default CreateLesson;

export default withTracker(({ props }) => {
  const lang = getUrlParam("lang");
  const _id = getUrlParam("id");

  Meteor.subscribe("lesson", _id);

  const query = (_id && { _id }) || { "meta.lang": lang };
  return {
    lesson: COL_Lessons.findOne({ _id }, { sort: { createdAt: -1 } }),
  };
})(StudentLesson);
