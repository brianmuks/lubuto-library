//NOTE holds all create lesson components

import React, {  useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import {TOOLS_STATE} from './../d-context';


const initialState = {
  x: 0,
  y: 0,
  node: {},
  icons: [],
  _id: '',
  name: ''
}

// todo: Push the icon name to the icon array, as items that have been moved

function reducer(state, action) {
  switch (action.type) {
    case 'DROP':
      return { ...action,};
    case 'DRAG':
      return { ...action };
    default:
    return state;
  }
}


function CreateLesson() {

  const value = useReducer(reducer, { data: initialState })

  return (
    <TOOLS_STATE.Provider value={value}>
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
