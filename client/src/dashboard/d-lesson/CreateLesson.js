//NOTE holds all create lesson components

import React, { useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import { lessonReducer } from "./../d-redux/reducers/lessonReducer";
import ImageList from "./ImageList";
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
}

// todo: Push the icon name to the icon array, as items that have been moved

function CreateLesson() {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  return (
    <TOOLS_STATE.Provider value={{ state, dispatch }}>
      <div className='editor-container'>

        <Tools />
        <LessonNavBar />
        <div className="row">
          <ToolConfig />
          <MainEditor />
          {/* <ImageList /> */}
          <StagedTools />
          <ResourceEditor />
        </div>
      </div>
    </TOOLS_STATE.Provider>
  );
}



export default CreateLesson;
