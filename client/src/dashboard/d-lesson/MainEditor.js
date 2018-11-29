import React, { useContext } from "react";
//import { useDragging } from "./ResourceEditor";
import { TOOLS_STATE } from "./../d-context";
import Draggable from "react-draggable";

function MainEditor() {
  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, color, bgColor, size, spacing } = state;
  const { x, y, node, _id, name } = useDragging();
  return (
    <div className="col m7 offset-m3 grey lighten-3 editor">
      MAIN EDITOR <br />
      <RenderTools tools={staggedTools} color={color} bgColor={bgColor}/>
      <span>{color}</span> <br />
      <span>{size}</span>  <br />
      <span>{spacing}</span> <br />
      <span>{bgColor}</span>
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
      <div >
        <i className="material-icons" style={tool.style}>{tool.name}</i>
      </div>
    </Draggable>
  ));
}

export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch }
}


export default MainEditor;
