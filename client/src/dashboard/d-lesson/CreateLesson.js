//NOTE holds all create lesson components

import React, { useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import { lessonReducer } from "./../d-redux/reducers/lessonReducer";
import ImageList from "./ImageList";
import ToolConfig, { TOOL_CONFIG_MODAL_ID} from "./config/ToolConfig";

const initialState = {
  data:{  x: 0,
    //TODO: REMOVE
    y: 0,
    node: {},
    icons: [],
    _id: '',
    name: ''},
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
        <RenderConfigBtnTrigger  />
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

function RenderConfigBtnTrigger(){
  return(
    <div className="tool-config  col m12 offset-s5">
      <a href={`#${TOOL_CONFIG_MODAL_ID}`} className='waves-effect  waves-light  white-text  modal-trigger'>Settings</a>
    </div>
  )

}

export default CreateLesson;
