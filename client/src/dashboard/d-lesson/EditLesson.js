//NOTE holds all create lesson components

import React, { useReducer, useEffect, useState } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "../d-context";
import { lessonReducer } from "../d-redux/reducers/lessonReducer";
import ToolConfig, { TOOL_CONFIG_MODAL_ID } from "./config/ToolConfig";
import { withTracker } from "meteor/react-meteor-data";
import { COL_Lessons } from "../../../../lib/Collections";
import { getUrlParam } from "../../utilities/Tasks";
import { editStaggedTools, setMeta } from "../d-redux/actions/lessonActions";
import LessonNavBar from "./LessonNavaBar";

const initialState = {
  meta: {},
  tools: [],
  addedTools: [],
  staggedTools: [],
  editTool: {},
  imageFiles: [],
  audioFiles: [],
};

// todo: Push the icon name to the icon array, as items that have been moved

function EditLesson({ lesson }) {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const [isLessonLoaded, preventLessonReload] = useState(false);
  const [toolEditorVisibility, setToolEditorVisibility] = useState(false);

  let IS_PREVENT_LESSON_RELOAD = false;

  useEffect(() => {
    if (!lesson || !lesson.content) {
      return;
    }

    let lessonContent = lesson.content;

    var result = Object.keys(lessonContent).map(function (key) {
      return lessonContent[key];
    });

    lesson && console.log("staggedTools", result);

    if (IS_PREVENT_LESSON_RELOAD === false) {
      // dispatch(editStaggedTools(result)) ;
    }
    lesson && console.log("result", lesson.content);
    if (result.length > 0 && !isLessonLoaded) {
      IS_PREVENT_LESSON_RELOAD = true;
      preventLessonReload(true);
      dispatch(editStaggedTools(result));
      dispatch(setMeta(lesson.meta));
      console.log(
        "IS_PREVENT_LESSON_RELOAD",
        isLessonLoaded,
        state.staggedTools,
        result.length
      );
    }
  });

  return (
    <TOOLS_STATE.Provider value={{ state, dispatch }}>
      <ResourceEditor
        onCancel={() => setToolEditorVisibility(false)}
        onDone={() => setToolEditorVisibility(false)}
        onDelete={() => setToolEditorVisibility(false)}
        isEdit
        visibility={toolEditorVisibility}
      />
      <div className="editor-container">
        <Tools lessonId={lesson && lesson._id} isEdit />
        <LessonNavBar />

        <div className="row">
          <ToolConfig isEdit />
          <MainEditor
            isEdit
            setToolEditorVisibility={setToolEditorVisibility}
          />
          <StagedTools isEdit />
        </div>
      </div>
    </TOOLS_STATE.Provider>
  );
}

export default withTracker((props) => {
  const _id = props.match.params.id;
  const lang = getUrlParam("lan");
  Meteor.subscribe("lesson", _id);
  return {
    lesson: COL_Lessons.findOne({ _id }, { sort: { createdAt: -1 } }),
  };
})(EditLesson);
