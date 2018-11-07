import React, { useContext } from "react";
import { ToolsState } from './CreateLesson'

function MainEditor() {
  const [value, dispatch]  = useContext(ToolsState)
  const { data: { x, y } } = value
  return (
  <div className="col m7 offset-m3 grey editor">
     MAIN EDITOR <br />

     {`${x} and ${y} for the moving icon`}
  </div>)
}

export default MainEditor;
