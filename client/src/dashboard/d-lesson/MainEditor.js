import React, { useContext } from "react";
import { ToolsState } from './CreateLesson'

function MainEditor() {
  const [value, dispatch]  = useContext(ToolsState)
  const { data: { x, y, node } } = value
  return (
  <div className="col m7 offset-m3 grey editor">
     MAIN EDITOR <br />

     
     x: { x }  <br />
     y: { y }  <br />
     iconName: { node && node.innerHTML }
  </div>)
}

export default MainEditor;
