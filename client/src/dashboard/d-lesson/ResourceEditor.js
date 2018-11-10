import React, { useContext } from "react";
import Draggable from "react-draggable";
import {TOOLS_STATE} from './../d-context';


function ResourceEditor() {

  const {state} = useContext(TOOLS_STATE);
  const tools = state.addedTools;

  const { x, y, node, dispatch } = useDragging()
  
  function handleDrag(e, pos, icon) {
    dispatch({ type: "DRAG", data: pos });
  }
  function handleDrop(e, pos, icon) {
    dispatch({ type: "DROP", data: { ...pos, ...icon } });
  }
  
  return (
    <div className="col m7 offset-m3 blue resource-editor">
      {tools.map((icon,index) => (
        <Draggable key={index} 
          onDrag={ (e, data) =>  handleDrag(e, data, icon)}
          onStop={(e, data) =>  handleDrop(e, data, icon)}
        >
          <i className="material-icons">{icon.name}</i>
        </Draggable>
      ))}
      <br />
      x: {x} <br />
      y: {y} <br />
      iconName: {node && node.innerHTML}
    </div>
  );
}





export function useDragging(){
  const {state, dispatch} = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch }
}


export default ResourceEditor;