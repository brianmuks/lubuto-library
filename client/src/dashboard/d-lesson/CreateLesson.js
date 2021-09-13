//NOTE holds all create lesson components

import React, { useReducer, useState } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import { lessonReducer } from "./../d-redux/reducers/lessonReducer";
import LessonNavBar from "./LessonNavaBar";
import ToolConfig from "./config/ToolConfig";

const initialState = {
  meta:{},
  tools:[],
  addedTools:[],
  staggedTools:[],
  editTool:{},
  imageFiles:[],
  audioFiles:[],
  lessonId:null,//set when the lesson is saved
}

// todo: Push the icon name to the icon array, as items that have been moved

function CreateLesson() {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const [toolEditorVisibility, setToolEditorVisibility] = useState(false);

  return (
    <TOOLS_STATE.Provider value={{ state, dispatch }}>
      <ResourceEditor
        onCancel={() => setToolEditorVisibility(false)}
        onDelete={() => setToolEditorVisibility(false)}
        onDone={() => setToolEditorVisibility(false)}
        isEdit
        visibility={toolEditorVisibility}
      />

      <div className="editor-container">
        <Tools />
        <LessonNavBar />
        <div className="row">
          <ToolConfig />
          <MainEditor setToolEditorVisibility={setToolEditorVisibility} />
          <StagedTools />
        </div>
      </div>
    </TOOLS_STATE.Provider>
  );
}



export default CreateLesson;
