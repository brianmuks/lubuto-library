//NOTE holds all create lesson components

import React, { useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import { lessonReducer } from "./../d-redux/reducers/lessonReducer";

const initialState = {
  data:{  x: 0,
    y: 0,
    node: {},
    icons: [],
    _id: '',
    name: ''},
  tools:[],
  addedTools:[],
  staggedTools:[],
  editTool:{}
}

// todo: Push the icon name to the icon array, as items that have been moved

function CreateLesson() {
  const [state, dispatch] = useReducer(lessonReducer, initialState);

 

  return (
    <TOOLS_STATE.Provider value={{ state, dispatch }}>
      <section>
        <Tools />
        <div className="row">
          <MainEditor />
          <StagedTools />
          <ResourceEditor />
        </div>
      </section>
    </TOOLS_STATE.Provider>
  );
}



export default CreateLesson;
