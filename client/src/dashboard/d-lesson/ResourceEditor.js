import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import { TOOLS_STATE } from "./../d-context";
import { updateTool } from '../d-redux/actions/lessonActions'

function ResourceEditor() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, editTool } = state;
  const [color, setColor ] = useState('color')
  const [bgColor, setbgColor ] = useState('color')
  
  function handleValueChange(e, field){
    switch (field) {
      case 'color':
          setColor(e.target.value)  
        break;
        case 'bgColor':
          setbgColor(e.target.value)   
      break;
      default:
        break;
    }
  }
  function handleEditTools(){
    dispatch(updateTool(color, bgColor)) 
  }

  // I am going to make this static for now, if there is need 
  const styles = ["Color", "Background Color", "size", "spacing"];
 
  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
      <h6>Edit Tool</h6>
      <div className="row ">
      
        <div className="input-field col s2">
            <input
              value={color}
              id="color"
              type="text"
              className="validate"
              onChange={e => handleValueChange(e, 'color')}
            />
            <label className="active" htmlFor="color">
              {'Color'}
            </label>
          </div>
          <div className="input-field col s2">
            <input
              value={bgColor}
              id="color"
              type="text"
              className="validate"
              onChange={e => handleValueChange(e, 'bgColor')}
            />
            <label className="active" htmlFor="color">
              {'Color'}
            </label>
          </div>


        <button className="btn " onClick={handleEditTools}>Ok</button>
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
