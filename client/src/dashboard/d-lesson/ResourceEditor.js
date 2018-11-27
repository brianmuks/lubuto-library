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

  
  // function handleValueChange(e, field) {
  //   switch (field) {
  //     case 'Color':
  //       setColor(e.target.value)
  //       break;
  //     case 'BackgroundColor':
  //       setbgColor(e.target.value)
  //       break;
  //     case 'size':
  //       setSize(e.target.value)
  //       break;
  //     case 'spacing':
  //       setSpace(e.target.value)
  //       break;
  //     default:
  //       break;
  //   }
  // }
  function handleEditTools(){
    dispatch(updateTool(color.value, bgColor.value, size.value, space.value)) 
  }

  // I am going to make this static for now, if there is need 
  // const styles = ["Color", "Background Color", "size", "spacing"];
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
            // value={style.value}
            id="color"
            type="text"
            className="validate"
            // onChange={e => handleValueChange(e, style.name)}
            {...style.value}
          />
          <label className="active" htmlFor="color">
            {style.name}
          </label>
        </div>
        ))
      }
{/*       
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
          </div> */}


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
