//NOTE holds all create lesson components

import React, { createContext, useState, useReducer } from "react";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";


export const ToolsState = createContext();

const initialState = {
  x: 0,
  y: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'DROP':
      return { ...action };
    case 'DRAG':
      return { ...action };
    default:
    return initialState;
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
