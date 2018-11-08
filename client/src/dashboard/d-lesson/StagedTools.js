import React from "react";
import { useDragging } from './ResourceEditor'


function StagedTools() {
  const { x, y, node, name, _id } = useDragging()
  console.log(name);
  return (
    <div className="red right col m2 staged-resource editor">
    STAGGED TOOLS <br />

     x: { x }  <br />
     y: { y }  <br />

     iconName: { node && node.innerHTML } <br />
     actualName: { name }<br />
     iconId: { _id }
    
    </div>
  );
}

export default StagedTools;

