import React, { useContext } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Draggable from "react-draggable";
import { Tools } from "../../../../lib/Collections";
import {TOOLS_STATE} from './../d-context';


function ResourceEditor({ tools }) {

  const { x, y, node, dispatch } = useDragging()
  
  function handleDrag(e, pos, icon) {
    dispatch({ type: "DRAG", data: pos });
  }
  function handleDrop(e, pos, icon) {
    dispatch({ type: "DROP", data: { ...pos, ...icon } });
  }
  
  return (
    <div className="col m7 offset-m3 blue resource-editor">
      {tools.map(icon => (
        <Draggable key={icon._id} 
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

export default withTracker(() => {
  Meteor.subscribe("tools");
  return {
    tools: Tools.find().fetch()
  };
})(ResourceEditor);



export function useDragging(){
  const [value, dispatch] = useContext(TOOLS_STATE);
  const { data } = value;
  return { ...data, dispatch }
}