import React, { useContext } from "react";
import Draggable from "react-draggable";
import { TOOLS_STATE } from "./../d-context";

function ResourceEditor() {
  const { state } = useContext(TOOLS_STATE);
  const { staggedTools, editTool } = state;

  const { x, y, node, dispatch } = useDragging();


  const styles = ["Color", "Background Color", "size", "spacing"];

  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
      <h6>Edit Tool</h6>

      <div className="row ">
        {styles.map((style, key) => (
          <div key={key} className="input-field col s2">
            <input
              defaultValue=""
              id="first_name2"
              type="text"
              className="validate"
            />
            <label className="active" htmlFor="first_name2">
              {style}
            </label>
          </div>
        ))}

        <button className="btn ">Ok</button>
      </div>

      <div className={"col s6 center"}>
        <i className="material-icons">{editTool.name}</i>
      </div>

      <br />
    </div>
  );
}

export function useDragging() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { data } = state;
  return { ...data, dispatch };
}

export default ResourceEditor;
