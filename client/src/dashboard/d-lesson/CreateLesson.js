//NOTE holds all create lesson components

import React, { useReducer, useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";
import Tools from "./Tools";
import MainEditor from "./MainEditor";
import StagedTools from "./StagedTools";
import ResourceEditor from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import { lessonReducer } from "./../d-redux/reducers/lessonReducer";
import { checkUserRole } from "../../common/components/Accounts/accountsUtils";

const initialState = {
  data: { x: 0, y: 0, node: {}, icons: [], _id: "", name: "" },
  tools: [],
  addedTools: []
};

// todo: Push the icon name to the icon array, as items that have been moved

function CreateLesson() {
  const [state, dispatch] = useReducer(lessonReducer, initialState);
  const [isAdmin, setRole] = useState(true);

 useMount(() => {
   const user = checkUserRole()
   if(user !== 'admin'){
       setRole(false)
      }
    })
    if (!isAdmin) {
      return <Redirect to="/" />
   }

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

function useMount(fn){
  useEffect(fn, [])
}

export default CreateLesson;
