import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import { TOOLS_STATE } from "./../d-context";
import { updateTool } from '../d-redux/actions/lessonActions'

function ResourceEditor() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, editTool } = state;
  const [value, setColor ] = useState('color')
  
  function handleValueChange(e, field){
    switch (field) {
      case 'Color':
      setColor(e.target.value)
        dispatch(updateTool(value))   
        break;
      default:
        break;
    }
  }

  const styles = ["Color", "Background Color", "size", "spacing"];
 
  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
      <h6>Edit Tool</h6>

      <div className="row ">
        {styles.map((style, key) => (
          <div key={key} className="input-field col s2">
            <input
              value={value}
              id="color"
              type="text"
              className="validate"
              onChange={e => handleValueChange(e, style)}
            />
            <label className="active" htmlFor="color">
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
