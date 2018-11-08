import React from "react";
import { useDragging } from './ResourceEditor'


function StagedTools() {
  const { x, y, node } = useDragging()
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

