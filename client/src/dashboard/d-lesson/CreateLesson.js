//NOTE holds all create lesson components

import React, { createContext, useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";


export const ToolsState = createContext();

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
    <ToolsState.Provider value={value}>
      <section>
        <Tools />
        <div className="row">
          <MainEditor />
          <StagedTools />
          <ResourceEditor />
        </div>
      </section>
    </ToolsState.Provider>
  );
}

export default CreateLesson;
