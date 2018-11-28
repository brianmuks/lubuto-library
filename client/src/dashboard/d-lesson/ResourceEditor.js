import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import { TOOLS_STATE } from "./../d-context";
import { updateTool } from '../d-redux/actions/lessonActions'
import { useFormInput } from '../../common/components/Accounts/accountsUtils'

function ResourceEditor() {
  const { state, dispatch } = useContext(TOOLS_STATE);
  const { staggedTools, editTool } = state;
  const color = useFormInput('color')
  const bgColor = useFormInput('bgColor')
  const size = useFormInput('size')
  const space = useFormInput('space')

  
  function handleEditTools(){
    dispatch(updateTool(color.value, bgColor.value, size.value, space.value)) 
  }

  // I am going to make this static for now, if there is need 
  const styles = [
    { name: "Color", "value": color },
    { name: "BackgroundColor", "value": bgColor },
    { name: "size", "value": size },
    { name: "spacing", "value": space },
  ]
  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
      <h6>Edit Tool</h6>
      <div className="row ">
      {
        styles.map((style, i) => (
          <div className="input-field col s2" key={i}>
          <input
            id="color"
            type="text"
            className="validate"
            {...style.value}
          />
          <label className="active" htmlFor="color">
            {style.name}
          </label>
        </div>
        ))
      }


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
