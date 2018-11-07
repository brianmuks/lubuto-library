import React, { useContext } from "react";
import { ToolsState } from './CreateLesson'


function StagedTools() {
  const [value, dispatch]  = useContext(ToolsState)
  const { data: { x, y, node } } = value
  return (
    <div className="red right col m2 staged-resource editor">
    STAGGED TOOLS <br />

    {` ${x} and ${y} for the ${node && node.innerHTML}  moving icon`}
    
    </div>
  );
}

export default StagedTools;

