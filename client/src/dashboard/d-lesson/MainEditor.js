import React, { useContext } from "react";
import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import Draggable from "react-draggable";

function MainEditor() {
  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor } = state;
  const { x, y, node, _id, name } = useDragging();
  return (
    <div className="col m7 offset-m3 grey lighten-3 editor">
      MAIN EDITOR <br />
      <RenderTools tools={staggedTools} color={color} bgColor={bgColor}/>
    </div>
  );
}

function handleDrag(e, pos, icon) {
  //  dispatch({ type: "DRAG", data: pos });
}

function handleDrop(e, pos, tool) {
  // NOTE: each time an elem is drgged, a new tool gets added to
  // staggedTools. This should not be the case.
  //
  //dispatch({ type: "DROP", tool:{pos,tool} });
}

function RenderTools({ tools, color='' , bgColor=''}) {
  return tools.map((tool, index) => (
    <Draggable
      key={index}
      onDrag={(e, data) => handleDrag(e, data, tool)}
      onStop={(e, data) => handleDrop(e, data, tool)}
    >
      <div className={tool.css || "col s1"} style={tool.style}>
        <i className="material-icons" style={{color}}>{tool.name}</i>
      <p className='red-text'>
        {bgColor}
      </p>
      </div>
    </Draggable>
  ));
}

export default MainEditor;
