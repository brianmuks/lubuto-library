import React, { useContext,useState,useReducer } from "react";
import Draggable from "react-draggable";
import {TOOLS_STATE} from './../d-context';
import { addTool,editStaggedTools } from "./../d-redux/actions/lessonActions";

const initialState = {
 
}

const EDIT_TOOL = 'EDIT_TOOL';

function reducer(state,action){

  switch (action.type) {
    case EDIT_TOOL:
      console.log(state)
    return Object.assign(
      {...state},
      {...action.newStyle}
    )
    default:
      return state
  }

}

function ResourceEditor() {

  const [stateStyles,_dispatch] = useReducer(reducer,initialState);

  const {state,dispatch} = useContext(TOOLS_STATE);
  const {staggedTools,editTool} = state;

  const styles = [{name:'color',label:'Color'},{label:'Background Color',name:'background-color'}
                  ,{name:'padding',label:'Padding'},{name:'fontSize',label:'Size'},{name:'border-radius',label:'Border'}
                  ,{name:'width',label:'Container Width'},{name:'height',label:'Container Height'}
                 ]

       const done = ()=>{
        //remove edited tool as way of replacing it
        const toolIndex = editTool.index;
         console.log(editTool, 'editTool', staggedTools,'staggedTools');
        let tools = staggedTools.filter(i=> i.index !== toolIndex );
        tools = [...tools,{...editTool,style:stateStyles,index:editTool.index}];
        Object.keys(editTool).length && dispatch(editStaggedTools(tools))
       }         


  return (
    <div className="col m7 offset-m3 grey lighten-3 resource-editor">
    <h6>Design</h6>
      <div className="row">
    {styles.map((style,key)=>(
      <StyleTool _dispatch={_dispatch} label={style.label} name={style.name}  key={key} index={key} />
    ))}

  <button onClick={done} className='btn'>Ok</button>
  </div>
     <div  className={ 'col s6 center'} >
    <i  style={stateStyles} className={`fa material-icons ${stateStyles.size}`}>{editTool.name}</i>
    </div>
      <br />
    </div>
  );
}


function StyleTool({name,label,index,_dispatch}){
 const {onChange,styles} =  useOnEdit(name,_dispatch);
  return <div key={index} className="input-field col s2">
  <input defaultValue=""  id={name} onChange={onChange} type="text" className="validate" />
  <label className="active" htmlFor={name}>{label}</label>
</div>
} 

function useOnEdit(name,_dispatch){
      let newStyle = {};
      const formatStyle = (e)=>{
        newStyle[name] =e.target.value;
        return newStyle;
      }
      return{
        onChange:e=>_dispatch({type:EDIT_TOOL,newStyle:formatStyle(e)}),
              }
}

export default ResourceEditor;
