import React, { useContext } from "react";
import { ToolsState } from './CreateLesson'


function StagedTools() {
  const [value, dispatch]  = useContext(ToolsState)
  const { data: { x, y } } = value
  return (
    <div className="red right col m2 staged-resource editor">
    STAGGED TOOLS <br />

    {` ${x} and ${y} for the moving icon`}
    
    </div>
  );
}

export default StagedTools;

