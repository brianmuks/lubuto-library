import React, { useContext } from "react";
import { withTracker } from "meteor/react-meteor-data";
import Draggable from "react-draggable";
import { Tools } from "../../../../lib/Collections";
import { ToolsState } from "./CreateLesson";

function ResourceEditor({ tools }) {
  const [value, dispatch] = useContext(ToolsState);
  const {
    data: { x, y, node }
  } = value;
  const dragHandlers = { onDrag: handleDrag, onStop: handleDrop };

  function handleDrag(e, pos) {
    dispatch({ type: "DRAG", data: pos });
  }
  function handleDrop(e, pos) {
    dispatch({ type: "DROP", data: pos });
  }

  return (
    <div className="col m7 offset-m3 blue resource-editor">
      {tools.map(icon => (
        <Draggable key={icon._id} {...dragHandlers}>
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
