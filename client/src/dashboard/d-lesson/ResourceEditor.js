import React, { useContext } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Draggable from "react-draggable";
import { Tools } from "../../../../lib/Collections";
import { ToolsState } from "./CreateLesson";

function ResourceEditor({ tools }) {

  const { x, y, node, dispatch } = useDragging()

  return (
    <div className="col m7 offset-m3 blue resource-editor">
      {tools.map(icon => (
        <Draggable key={icon._id} 
          onDrag={ (e, data) =>  useHandlers(e, data, icon, dispatch, 'DRAG')}
          onStop={(e, data) =>  useHandlers(e, data, icon, dispatch, 'DROP')}
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
  const [value, dispatch] = useContext(ToolsState);
  const { data } = value;
  return { ...data, dispatch }
}

/**
 * 
 */
export function useHandlers(e, pos, icon, action, type){
  switch (type) {
    case 'DRAG':
      return action({ type, data: { ...pos, ...icon } });
    case 'DROP':
      return action({ type, data: { ...pos, ...icon } });
  }
}