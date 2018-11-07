import React, { useContext } from "react";
import { ToolsState } from './CreateLesson'


function StagedTools() {
  const [value, dispatch]  = useContext(ToolsState)
  const { data: { x, y, node } } = value
  return (
    <div className="red right col m2 staged-resource editor">
    STAGGED TOOLS <br />

         
     x: { x }  <br />
     y: { y }  <br />
     iconName: { node && node.innerHTML }
    
    </div>
  );
}

export default StagedTools;

