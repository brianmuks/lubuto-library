import React from "react";
import { useDragging } from './ResourceEditor'

function MainEditor() {
    const { x, y, node } = useDragging()
  return (
  <div className="col m7 offset-m3 grey editor">
     MAIN EDITOR <br />
     
     x: { x }  <br />
     y: { y }  <br />
     iconName: { node && node.innerHTML }
  </div>
  )
}

export default MainEditor;
